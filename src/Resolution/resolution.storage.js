import { Storage } from '../Storage.js';

class Patients extends Storage {
  async removeValue(key, index) {
    this.storage[index][key] = {resolution: '', expire: ''};
  }

  async update(index, key, value) {
    console.log(`index=${index} key=${key} value=${value}`);
    console.log('this.storage[index][key]', this.storage[index][key]);
    this.storage[index][key] = value;
  }

  async getResolution(index, key) {
    return this.storage[index][key];
  }
}

const patients = new Patients();

export default patients;
