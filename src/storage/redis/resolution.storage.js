import * as client from './storage.js';

export default class RedisResolution {
  constructor() {
    this.queueName = 'resolution';
    this.id = 0;
  }

  async get() {
    const data = await client.getKeys(`${this.queueName}:*`);
    return data;
  }

  async add(key, value) {
    const { resolution, ttl } = value;
    if (ttl > 0) {
      await client.setexValue(`${this.queueName}:${this.id}:${key}`, +ttl, resolution);
    } else {
      await client.setValue(`${this.queueName}:${this.id}:${key}`, resolution);
    }
    this.id += 1;
  }

  async findIndex(key) {
    let index = -1;
    const storage = await this.get();
    for (let i = 0; i < storage.length; i += 1) {
      const [, id, name] = storage[i].split(':');
      if (name === key) {
        index = id;
        break;
      }
    }
    return index;
  }

  async getResolution(index, key) {
    const resolution = await client.getValue(`${this.queueName}:${index}:${key}`);
    return { resolution };
  }

  async update(index, key, value, ttl) {
    await client.appendValue(`${this.queueName}:${index}:${key}`, ` ${value}`);
    if (ttl > 0) {
      await client.setExpiration(`${this.queueName}:${index}:${key}`, +ttl);
    }
  }

  async isEmpty() {
    const keys = await this.get();
    return keys.length < 1;
  }

  async removeValue(key, index) {
    await client.setValue(`${this.queueName}:${index}:${key}`, '');
  }
}
