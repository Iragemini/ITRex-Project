import { Storage } from '../storage/Storage.js';

export class Patients extends Storage {
  async removeValue(key, index) {
    this.storage[index][key] = {resolution: '', expire: ''};
  }

  async update(index, key, value) {
    this.storage[index][key] = value;
  }

  async getResolution(index, key) {
    return this.storage[index][key];
  }
}

