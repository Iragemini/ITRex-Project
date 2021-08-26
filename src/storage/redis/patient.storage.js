import generateID from '../../utils/generateId.js';

export default class RedisPatient {
  constructor(redisClient) {
    this.redisClient = redisClient;
    this.queueName = 'patient';
  }

  async reset() {
    await this.redisClient.FLUSHALL();
  }

  async get() {
    const data = await this.redisClient.KEYS(`${this.queueName}:*`);
    return data;
  }

  async isEmpty() {
    const keys = await this.get();
    return keys.length === 0;
  }

  async add(id, patientData) {
    const { name } = patientData;
    await this.redisClient.SET(`${this.queueName}:${id}:${name}`, '');
  }

  async getIdByName(patientName) {
    let patientId = null;
    const patientStorage = await this.get();
    for (let i = 0; i < patientStorage.length; i += 1) {
      const [, id, name] = patientStorage[i].split(':');
      if (name === patientName) {
        patientId = id;
        break;
      }
    }
    return patientId;
  }

  async getPatientById(patientId) {
    let patientName = null;
    const patientStorage = await this.get();
    for (let i = 0; i < patientStorage.length; i += 1) {
      const [, id, name] = patientStorage[i].split(':');
      if (id === patientId) {
        patientName = name;
        break;
      }
    }
    return patientName;
  }

  async createPatient(patientData) {
    let id = 0;
    const { name } = patientData;
    const patientId = await this.getIdByName(name);
    if (patientId) {
      return patientId;
    }
    if (!(await this.isEmpty())) {
      const patientStorage = await this.get();
      const arrayOfID = patientStorage.map((item) => item.split(':')[1]);
      id = generateID(arrayOfID);
    }
    await this.add(id, patientData);
    return id;
  }
}
