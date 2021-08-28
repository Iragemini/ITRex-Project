export default class RedisQueue {
  constructor(createClient) {
    this.queueName = 'queue';
    this.redisClient = createClient();
  }

  async reset() {
    await this.redisClient.FLUSHALL();
  }

  async get() {
    const data = await this.redisClient.LRANGE(this.queueName, 0, -1);
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

  async add(id, reason = '') {
    await this.redisClient.RPUSH(this.queueName, `${id}:${reason}`);
  }

  async isEmpty() {
    return (await this.redisClient.LLEN(this.queueName)) === 0;
  }

  async remove() {
    await this.redisClient.LPOP(this.queueName);
  }
}
