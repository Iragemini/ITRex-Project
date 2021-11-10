import createClient from './client.js';

export class RedisCache {
  constructor(create) {
    this.redisClient = create('cache_client');
  }

  async set(key, value, ttl) {
    if (ttl < 0) {
      return;
    }
    await this.redisClient.SETEX(key, ttl, JSON.stringify(value));
  }

  async get(key) {
    const data = await this.redisClient.GET(key);
    if (data) {
      return JSON.parse(data);
    }
  }

  async delete(key) {
    await this.redisClient.DEL(key);
  }
}

const redisCache = new RedisCache(createClient);

export default redisCache;
