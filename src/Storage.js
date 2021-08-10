export class Storage {
  constructor() {
    this.storage = [];
  }

  async get() {
    return this.storage;
  }

  reset() {
    this.storage.length = 0;
  }

  async add(key, value) {
    this.storage.push({ [key]: value });
  }

  async find(key) {
    let index = null;
    for (let i = 0; i < this.storage.length; i += 1) {
      if (this.storage[i][key]) {
        index = i;
        break;
      }
    }
    return index;
  }

  async remove(index) {
    this.storage.splice(index, 1);
  }
}
