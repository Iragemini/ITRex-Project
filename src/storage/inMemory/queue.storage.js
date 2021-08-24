import Storage from './Storage.js';

export default class MemoryQueue extends Storage {
  async getFirstKey() {
    return Object.keys(this.storage[0])[0];
  }

  async getNameByIndex(index) {
    return Object.keys(this.storage[index])[0];
  }

  async remove() {
    this.storage.shift();
  }
}
