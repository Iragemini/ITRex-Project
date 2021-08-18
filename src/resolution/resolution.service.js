import { isResolutionExpired } from '../utils/resolution.js';
import ApiError from '../errors/ApiError.js';
import config from '../../config/config.js';
const configTTL = config.ttl;

export class ResolutionService {
  constructor(storage) {
    this.storage = storage;
  }

  addResolution = async (name, resolution, ttl = '') => {
    if (!ttl) {
      ttl = configTTL;
    }
    const length = await this.storage.storageLength();
    if (!length) {
      await this.storage.add(name, { resolution, ttl });
      return;
    }
    const index = await this.storage.find(name);
    if (index !== null) {
      await this.storage.update(index, name, resolution, ttl);
      return;
    }

    await this.storage.add(name, { resolution, ttl });
  };

  deleteResolution = async (name) => {
    const index = await this.storage.find(name);
    if (index === null) {
      throw new ApiError(404, 'resolution not found');
    }
    await this.storage.removeValue(name, index);
  };

  findResolution = async (name) => {
    const message = 'No resolutions';
    const index = await this.storage.find(name);
    if (index === null) {
      throw new ApiError(404, 'patient not found');
    }
    const { resolution, expire } = await this.storage.getResolution(
      index,
      name
    );

    if (!isResolutionExpired(expire)) {
      return resolution || message;
    }
    await this.storage.remove(index);
    return message;
  };
}
