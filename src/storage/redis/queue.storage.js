export default class RedisQueue {
  constructor(redisClient) {
    this.redisClient = redisClient;
    this.queueName = 'queue';
  }

  async reset() {
    await this.redisClient.flushall();
  }

  async get() {
    const data = await this.redisClient.getList(this.queueName, 0, -1);
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
    await this.redisClient.addInQueue(this.queueName, `${id}:${reason}`);
  }

  async isEmpty() {
    return (await this.redisClient.getLength(this.queueName)) === 0;
  }

  async remove() {
    await this.redisClient.deleteFromQueue(this.queueName);
  }
}
