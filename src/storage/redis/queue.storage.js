import * as client from './storage.js';

export class Queue {
  constructor() {
    this.queueName = 'queue';
  }

  async get() {
    try {
      const data = await client.getList(this.queueName, 0, -1);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async getCurrentKey() {
    try {
      const keys = await this.get();
      return keys[0].split(':')[0];
    } catch (e) {
      throw e;
    }
  }

  async getNameByIndex(index) {
    try {
      const keys = await this.get();
      return keys[index].split(':')[0];
    } catch (e) {
      throw e;
    }
  }

  async add(key, value = '') {
    try {
      const data = `${key}:${value}`;
      await client.addInQueue(this.queueName, data);
    } catch (e) {
      throw e;
    }
  }

  async storageLength() {
    try {
      return await client.getLength(this.queueName);
    } catch (e) {
      throw e;
    }
  }

  async find(key) {
    try {
      let index = null;
      const storage = await this.get();
      for (let i = 0; i < storage.length; i += 1) {
        const [name, reason] = storage[i].split(':');
        if (name === key) {
          index = i;
          break;
        }
      }
      return index;
    } catch (e) {
      throw e;
    }
  }

  async remove(key) {
    try {
      await client.deleteFromQueue(this.queueName);
    } catch (e) {
      throw e;
    }
  }
}
