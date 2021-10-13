export default class RedisQueue {
  constructor(createClient) {
    this.listName = 'queue';
    this.redisClient = createClient();
  }

  async reset() {
    await this.redisClient.FLUSHALL();
  }

  async getFirstKey(doctorId) {
    const value = await this.redisClient.LINDEX(`${this.listName}:${doctorId}`, 0);

    if (!value) {
      return null;
    }

    return value;
  }

  async add(patientId, doctorId) {
    await this.redisClient.RPUSH(`${this.listName}:${doctorId}`, `${patientId}`);
  }

  async isEmpty(doctorId) {
    return (await this.redisClient.LLEN(`${this.listName}:${doctorId}`)) === 0;
  }

  async remove(doctorId) {
    await this.redisClient.LPOP(`${this.listName}:${doctorId}`);
  }
}
