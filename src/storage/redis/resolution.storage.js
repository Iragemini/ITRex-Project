export default class RedisResolution {
  constructor(redisClient) {
    this.redisClient = redisClient;
    this.queueName = 'resolution';
  }

  async reset() {
    await this.redisClient.FLUSHALL();
  }

  async get() {
    const data = await this.redisClient.KEYS(`${this.queueName}:*`);
    return data;
  }

  async add(patientId, value) {
    const { resolution, ttl } = value;
    if (ttl > 0) {
      await this.redisClient.SETEX(`${this.queueName}:${patientId}`, +ttl, resolution);
    } else {
      await this.redisClient.SET(`${this.queueName}:${patientId}`, resolution);
    }
  }

  async findResolutionId(patientId) {
    let resolutionId = -1;
    const resolutionsStorage = await this.get();
    for (let i = 0; i < resolutionsStorage.length; i += 1) {
      const id = resolutionsStorage[i].split(':')[1];
      if (id === patientId) {
        resolutionId = id;
        break;
      }
    }
    return resolutionId;
  }

  async isResolutionExists(patientId) {
    let isExist = false;
    const resolutionsStorage = await this.get();
    for (let i = 0; i < resolutionsStorage.length; i += 1) {
      const id = resolutionsStorage[i].split(':')[1];
      if (id === patientId) {
        isExist = true;
        break;
      }
    }
    return isExist;
  }

  async getResolution(patientId) {
    const resolution = await this.redisClient.GET(`${this.queueName}:${patientId}`);
    return { resolution };
  }

  async update(patientId, value, ttl) {
    await this.redisClient.APPEND(`${this.queueName}:${patientId}`, ` ${value}`);
    if (ttl > 0) {
      await this.redisClient.EXPIRE(`${this.queueName}:${patientId}`, +ttl);
    }
  }

  async isEmpty() {
    const keys = await this.get();
    return keys.length === 0;
  }

  async removeValue(patientId) {
    await this.redisClient.SET(`${this.queueName}:${patientId}`, '');
  }
}
