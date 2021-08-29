import Storage from './Storage.js';

export default class MemoryQueue extends Storage {
  async getFirstKey() {
    return Object.keys(this.storage[0])[0];
  }

  async remove() {
    this.storage.shift();
  }
}
