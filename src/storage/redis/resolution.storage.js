import * as client from './storage.js';

export class Resolution {
  constructor() {
    this.queueName = 'resolution';
    this.id = 0;
  }

  async get() {
    try {
      const data = await client.getKeys(`${this.queueName}:*`);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async add(key, value) {
    try {
      const { resolution, ttl } = value;
      if(ttl > 0) {
        await client.setexValue(`${this.queueName}:${this.id}:${key}`, +ttl, resolution);
      }else{
        await client.setValue(`${this.queueName}:${this.id}:${key}`, resolution);
      }
      this.id += 1;
    } catch (e) {
      throw e;
    }
  }

  async findIndex(key) {
    try {
      let index = -1;
      const storage = await this.get();
      for (let i = 0; i < storage.length; i += 1) {
        const [table, id, name] = storage[i].split(':');
        if (name === key) {
          index = id;
          break;
        }
      }
      return index;
    } catch (e) {
      throw e;
    }
  }

  async getResolution(index, key) {
    try {
      const resolution = await client.getValue(
        `${this.queueName}:${index}:${key}`
      );
      return { resolution };
    } catch (e) {
      throw e;
    }
  }

  async update(index, key, value, ttl) {
    try {
      await client.appendValue(`${this.queueName}:${index}:${key}`, ` ${value}`);
      if (ttl) {
        await client.setExpiration(`${this.queueName}:${index}:${key}`, +ttl);
      }
    } catch (e) {
      throw e;
    }
  }

  async isEmpty() {
    try {
      const keys = await this.get();
      return keys.length < 1;
    } catch (e) {
      throw e;
    }
  }
  async removeValue(key, index) {
    try {
      await client.setValue(`${this.queueName}:${index}:${key}`, '');
    } catch (e) {
      throw e;
    }
  }
}
