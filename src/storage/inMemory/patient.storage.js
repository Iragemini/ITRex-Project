import Storage from './Storage.js';
import generateID from '../../utils/generateId.js';

export default class MemoryPatient extends Storage {
  createPatient = async (patientData) => {
    let id = 0;
    const { name } = patientData;
    const patientId = await this.getIdByName(name);
    if (patientId) {
      return patientId;
    }
    if (!(await this.isEmpty())) {
      const patientStorage = await this.get();
      const arrayOfID = patientStorage.map((item) => Object.keys(item)[0]);
      id = generateID(arrayOfID);
    }
    await this.add(id, name);
    return id;
  };

  getIdByName = async (name) => {
    if (await this.isEmpty()) {
      return null;
    }
    const storagePatients = await this.get();
    const patient = storagePatients.filter((item) => {
      const values = Object.values(item);
      return values[0] === name;
    });
    if (patient.length === 0) {
      return null;
    }
    return Object.keys(patient[0])[0];
  };

  getPatientById = async (id) => {
    const patient = this.storage.filter((item) => {
      const key = Object.keys(item)[0];
      return key === id;
    });
    if (patient.length === 0) {
      return null;
    }
    return Object.values(patient[0])[0];
  };

  deletePatient = async (id) => {
    const index = await this.findIndex(id);
    if (index >= 0) {
      await this.remove(index);
      return index;
    }
    return null;
  };
}
