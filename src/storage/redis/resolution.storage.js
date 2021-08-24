export default class RedisResolution {
  constructor(redisClient) {
    this.redisClient = redisClient;
    this.queueName = 'resolution';
    this.id = 0;
  }

  async reset() {
    this.id = 0;
    await this.redisClient.flushall();
  }

  async get() {
    const data = await this.redisClient.getKeys(`${this.queueName}:*`);
    return data;
  }

  async add(key, value) {
    const { resolution, ttl } = value;
    if (ttl > 0) {
      await this.redisClient.setexValue(`${this.queueName}:${this.id}:${key}`, +ttl, resolution);
    } else {
      await this.redisClient.setValue(`${this.queueName}:${this.id}:${key}`, resolution);
    }
    this.id += 1;
  }

  async findIndex(key) {
    let index = -1;
    const resolutionsStorage = await this.get();
    for (let i = 0; i < resolutionsStorage.length; i += 1) {
      const [, id, name] = resolutionsStorage[i].split(':');
      if (name === key) {
        index = id;
        break;
      }
    }
    return index;
  }

  async getResolution(index, key) {
    const resolution = await this.redisClient.getValue(`${this.queueName}:${index}:${key}`);
    return { resolution };
  }

  async update(index, key, value, ttl) {
    await this.redisClient.appendValue(`${this.queueName}:${index}:${key}`, ` ${value}`);
    if (ttl > 0) {
      await this.redisClient.setExpiration(`${this.queueName}:${index}:${key}`, +ttl);
    }
  }

  async isEmpty() {
    const keys = await this.get();
    return keys.length === 0;
  }

  async removeValue(key, index) {
    await this.redisClient.setValue(`${this.queueName}:${index}:${key}`, '');
  }
}
