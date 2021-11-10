export default class RedisQueue {
  constructor(createClient) {
    this.prefix = 'queue';
    this.redisClient = createClient('queue_client');
  }

  async reset() {
    await this.redisClient.FLUSHALL();
  }

  async getFirstKey(doctorId) {
    const value = await this.redisClient.LINDEX(`${this.prefix}:${doctorId}`, 0);

    if (!value) {
      return null;
    }

    return value;
  }

  async add(patientId, doctorId) {
    await this.redisClient.RPUSH(`${this.prefix}:${doctorId}`, `${patientId}`);
  }

  async isEmpty(doctorId) {
    return (await this.redisClient.LLEN(`${this.prefix}:${doctorId}`)) === 0;
  }

  async remove(doctorId) {
    await this.redisClient.LPOP(`${this.prefix}:${doctorId}`);
  }
}
