import ApiError from '../errors/ApiError.js';

export default class DoctorService {
  constructor(repository) {
    this.repository = repository;
  }

  getAllDoctors = async () => {
    const doctors = await this.repository.getAll();

    return doctors;
  }

  getDoctorById = async (id) => {
    const doctor = await this.repository.getById(id);

    return doctor;
  }

  getDoctorByUserId = async (userId) => {
    const doctor = await this.repository.getByUserId(userId);

    if (!doctor) {
      throw new ApiError(404, 'Doctor not found');
    }

    return doctor;
  };

  // addPatient = async (patientData) => {
  //   const id = await this.repository.createPatient(patientData);
  //   return id;
  // };

  // getPatientId = async (name) => {
  //   const patientId = await this.repository.getIdByName(name);
  //   if (!patientId) {
  //     throw new ApiError(404, `Patient ${name} not found`);
  //   }
  //   return patientId;
  // };

  // getPatientIdByUserId = async (userId) => {
  //   const patientId = await this.repository.getIdByUserId(userId);
  //   if (!patientId) {
  //     throw new ApiError(404, 'Patient not found');
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

  // /* not used */
  // deletePatient = async (id) => {
  //   const deleted = this.repository.deletePatient(id);
  //   if (!deleted) {
  //     throw new ApiError(404, 'Patient not found');
  //   }
  // };
}
