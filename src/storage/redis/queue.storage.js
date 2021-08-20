import * as client from './storage.js';

export default class RedisQueue {
  constructor() {
    this.queueName = 'queue';
  }

  async get() {
    const data = await client.getList(this.queueName, 0, -1);
    return data;
  }

  async getFirstKey() {
    const keys = await this.get();
    return keys[0].split(':')[0];
  }

  async getNameByIndex(index) {
    const keys = await this.get();
    return keys[index].split(':')[0];
  }

  async add(key, value = '') {
    const data = `${key}:${value}`;
    await client.addInQueue(this.queueName, data);
  }

  async isEmpty() {
    return (await client.getLength(this.queueName)) === 0;
  }

  async findIndex(key) {
    let index = -1;
    const storage = await this.get();
    for (let i = 0; i < storage.length; i += 1) {
      const name = storage[i].split(':')[0];
      if (name === key) {
        index = i;
        break;
      }
    }
    return index;
  }

  async remove() {
    await client.deleteFromQueue(this.queueName);
  }
}
