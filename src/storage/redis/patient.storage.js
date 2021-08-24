import generateID from '../../utils/generateId.js';

export default class RedisPatient {
  constructor(redisClient) {
    this.redisClient = redisClient;
    this.queueName = 'patient';
  }

  async reset() {
    await this.redisClient.flushall();
  }

  async get() {
    const data = await this.redisClient.getKeys(`${this.queueName}:*`);
    console.log('get data', data);
    return data;
  }

  async isEmpty() {
    const keys = await this.get();
    return keys.length === 0;
  }

  async add(id, patientData) {
    const { name } = patientData;
    console.log('add id', id);
    await this.redisClient.setValue(`${this.queueName}:${id}:${name}`, '');
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
    console.log('createPatient data', patientData);
    let id = 0;
    const { name } = patientData;
    const patientId = await this.getIdByName(name);
    console.log('createPatient patientId', patientId);
    if (patientId) {
      return patientId;
    }
    console.log('createPatient isEmpty', !(await this.isEmpty()));
    if (!(await this.isEmpty())) {
      const patientStorage = await this.get();
      const idArray = patientStorage.map((item) => item.split(':')[1]);
      console.log('createPatient idArray', idArray);
      id = generateID(idArray);
    }
    await this.add(id, patientData);
    return id;
  }

  async deletePatient(id) {
    console.log('storage', this.get());
    console.log('id', id);
  }
}
