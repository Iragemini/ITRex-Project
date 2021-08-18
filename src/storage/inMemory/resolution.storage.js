import { Storage } from './Storage.js';
import { getExpiration } from '../../utils/getExpiration.js';

export class Patients extends Storage {
  changeValue(value) {
    const { resolution, ttl } = value;
    const expire = getExpiration(ttl);
    return { resolution, expire };
  }

  async createNewValue(index, name, resolution, ttl) {
    try {
      let currentResolution = '';
      await this.getResolution(index, name).then((result) => {
        currentResolution = result.resolution;
      });
      console.log('currentResolution', currentResolution);
      const newValue = {
        resolution: `${currentResolution} ${resolution}`,
        ttl,
      };
      return this.changeValue(newValue);
    } catch (e) {
      console.log(e);
    }
  }

  async add(key, value) {
    const changedValue = this.changeValue(value);
    this.storage.push({ [key]: changedValue });
  }

  async removeValue(key, index) {
    this.storage[index][key] = { resolution: '', expire: '' };
  }

  async update(index, key, value, ttl) {
    const updatedValue = await this.createNewValue(index, key, value, ttl);
    this.storage[index][key] = updatedValue;
  }

  async getResolution(index, key) {
    return this.storage[index][key];
  }
}
