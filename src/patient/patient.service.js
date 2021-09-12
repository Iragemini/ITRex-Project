import ApiError from '../errors/ApiError.js';

export default class PatientService {
  constructor(repository) {
    this.repository = repository;
  }

  addPatient = async (patientData) => {
    const id = await this.repository.createPatient(patientData);
    return id;
  };

  getPatientByUserId = async (userId) => {
    const patient = await this.repository.getPatientByUserId(userId);

    if (!patient) {
      throw new ApiError(404, 'Patient not found');
    }

    return patient;
  };

  getPatientById = async (id) => {
    const patient = await this.repository.getPatientById(id);

    // commented out so the frontend will work ;/
    // if (!patient) {
    //   throw new ApiError(404, 'Patient not found');
    // }

    return patient;
  }
  /* not used */

  // getPatientId = async (name) => {
  //   const patientId = await this.repository.getIdByName(name);
  //   if (!patientId) {
  //     throw new ApiError(404, `Patient ${name} not found`);
  //   }
  //   return patientId;
  // };

  // getPatientName = async (id) => {
  //   const patientName = await this.repository.getPatientById(id);
  //   if (!patientName) {
  //     throw new ApiError(404, 'Patient not found');
  //   }
  //   return patientName;
  // };

  // deletePatient = async (id) => {
  //   const deleted = this.repository.deletePatient(id);
  //   if (!deleted) {
  //     throw new ApiError(404, 'Patient not found');
  //   }
  // };
}
