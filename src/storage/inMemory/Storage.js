export default class Storage {
  constructor(storage) {
    this.storage = storage;
  }

  async get() {
    return this.storage;
  }

  async reset() {
    this.storage.length = 0;
  }

  async add(key, value) {
    this.storage.push({ [key]: value });
  }

  async findIndex(key) {
    let index = -1;
    for (let i = 0; i < this.storage.length; i += 1) {
      if (key in this.storage[i]) {
        index = i;
        break;
      }
    }
    return index;
  }

  async remove(index) {
    this.storage.splice(index, 1);
  }

  async isEmpty() {
    return this.storage.length === 0;
  }
}
