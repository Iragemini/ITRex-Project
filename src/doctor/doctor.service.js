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

    if (!doctor) {
      throw new ApiError(404, 'Doctor not found');
    }

    return doctor;
  }

  getDoctorByUserId = async (userId) => {
    const doctor = await this.repository.getByUserId(userId);

    if (!doctor) {
      throw new ApiError(404, 'Doctor not found');
    }

    return doctor;
  };
}
