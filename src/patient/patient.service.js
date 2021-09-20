import ApiError from '../errors/ApiError.js';

export default class PatientService {
  constructor(repository) {
    this.repository = repository;
  }

  addPatient = async (patientData) => {
    const id = await this.repository.createPatient(patientData);
    return id;
  };

  getPatientById = async (id) => {
    const patient = await this.repository.getPatientById(id);

    if (!patient) {
      throw new ApiError(404, 'Patient not found');
    }

    return patient;
  }

  getPatientByUserId = async (userId) => {
    const patient = await this.repository.getPatientByUserId(userId);

    if (!patient) {
      throw new ApiError(404, 'Patient not found');
    }

    return patient;
  };
}
