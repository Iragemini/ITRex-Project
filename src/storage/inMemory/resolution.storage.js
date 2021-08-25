import Storage from './Storage.js';
import getExpiration from '../../utils/getExpiration.js';
import isResolutionExpired from '../../utils/resolution.js';

export default class MemoryResolution extends Storage {
  static changeValue(value) {
    const { resolution, ttl } = value;
    const expire = getExpiration(ttl);
    return { resolution, expire };
  }

  async createNewValue(patientId, resolution, ttl) {
    const { resolution: currentResolution } = await this.getResolution(patientId);
    const newValue = {
      resolution: `${currentResolution} ${resolution}`,
      ttl,
    };
    return MemoryResolution.changeValue(newValue);
  }

  async add(patientId, value) {
    const changedValue = MemoryResolution.changeValue(value);
    this.storage.push({ [patientId]: changedValue });
  }

  async removeValue(patientId) {
    const index = await this.findIndex(patientId);
    this.storage[index][patientId] = { resolution: '', expire: null };
  }

  async update(patientId, resolution, ttl) {
    const updatedValue = await this.createNewValue(patientId, resolution, ttl);
    const index = await this.findIndex(patientId);
    this.storage[index][patientId] = updatedValue;
  }

  async isResolutionExists(patientId) {
    let isExist = false;
    const index = await this.findIndex(patientId);
    if (index >= 0) {
      isExist = true;
    }
    return isExist;
  }

  async getResolution(patientId) {
    const index = await this.findIndex(patientId);
    const { resolution, expire } = this.storage[index][patientId];
    if (isResolutionExpired(expire)) {
      await this.remove(index);
      return { resolution: '' };
    }
    return { resolution };
  }
}
