import { isResolutionExpired } from '../utils/resolution.js';
import ApiError from '../errors/ApiError.js';
import config from '../../config/config.js';
const defaultTTL = config.ttl;

export class ResolutionService {
  constructor(storage) {
    this.storage = storage;
  }

  addResolution = async (name, resolution, ttl = defaultTTL) => {
    const isStorageEmpty = await this.storage.isEmpty();
    if (isStorageEmpty) {
      await this.storage.add(name, { resolution, ttl });
      return;
    }
    const index = await this.storage.findIndex(name);
    if (index >= 0) {
      await this.storage.update(index, name, resolution, ttl);
      return;
    }

    await this.storage.add(name, { resolution, ttl });
  };

  deleteResolution = async (name) => {
    const index = await this.storage.findIndex(name);
    if (index < 0) {
      throw new ApiError(404, `Resolution for ${name} not found`);
    }
    await this.storage.removeValue(name, index);
  };

  findResolution = async (name) => {
    const index = await this.storage.findIndex(name);
    if (index < 0) {
      throw new ApiError(404, `Patient ${name} not found`);
    }
    const { resolution, expire } = await this.storage.getResolution(
      index,
      name
    );

    if (!isResolutionExpired(expire)) {
      return resolution || null;
    }
    await this.storage.remove(index);
    return null;
  };
}
