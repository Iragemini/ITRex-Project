import ApiError from '../errors/ApiError.js';
import config from '../../config/config.js';

const defaultTTL = config.ttl;

export default class ResolutionService {
  constructor(storage) {
    this.storage = storage;
  }

  addResolution = async (name, resolution, ttl = defaultTTL) => {
    const index = await this.storage.findIndex(name);
    if (index < 0) {
      await this.storage.add(name, { resolution, ttl });
    } else {
      await this.storage.update(index, name, resolution, ttl);
    }
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
    const { resolution } = await this.storage.getResolution(index, name);

    return resolution || null;
  };
}
