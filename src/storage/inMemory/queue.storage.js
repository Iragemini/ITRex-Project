export default class MemoryQueue {
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

  async isEmpty() {
    return this.storage.length === 0;
  }

  async getFirstKey() {
    return Object.keys(this.storage[0])[0];
  }

  async remove() {
    this.storage.shift();
  }
}
