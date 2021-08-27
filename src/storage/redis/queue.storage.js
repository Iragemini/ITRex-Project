export default class RedisQueue {
  constructor(redisClient) {
    this.redisClient = redisClient;
    this.queueName = 'queue';
  }

  async reset() {
    this.id = 0;
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

  async add(key, value = '') {
    const data = `${key}:${value}`;
    await this.redisClient.addInQueue(this.queueName, data);
  }

  async isEmpty() {
    return (await this.redisClient.getLength(this.queueName)) === 0;
  }

  async findIndex(key) {
    let index = -1;
    const queueStorage = await this.get();
    for (let i = 0; i < queueStorage.length; i += 1) {
      const name = queueStorage[i].split(':')[0];
      if (name === key) {
        index = i;
        break;
      }
    }
    return index;
  }

  async remove() {
    await this.redisClient.deleteFromQueue(this.queueName);
  }
}
