import ApiError from '../errors/ApiError.js';

export default class PatientService {
  constructor(storage) {
    this.storage = storage;
  }

  addPatient = async (patientData) => {
    const id = await this.storage.createPatient(patientData);
    return id;
  };

  getPatientId = async (name) => {
    const patientId = await this.storage.getIdByName(name);
    if (!patientId) {
      throw new ApiError(404, `Patient ${name} not found`);
    }
    return patientId;
  };

  getPatientName = async (id) => {
    const patientName = await this.storage.getPatientById(id);
    if (!patientName) {
      throw new ApiError(404, 'Patient not found');
    }
    return patientName;
  };

  /* not used */
  deletePatient = async (id) => {
    const deleted = this.storage.deletePatient(id);
    if (!deleted) {
      throw new ApiError(404, 'Patient not found');
    }
  };
}
