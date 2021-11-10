import ApiError from '../errors/ApiError.js';

export default class DoctorService {
  constructor(repository) {
    this.repository = repository;
  }

  checkData = async (doctorData) => {
    const doctor = await this.repository.getByNameAndSpecId(doctorData);

    if (doctor.length) {
      throw new ApiError(409, `Doctor ${doctorData.name} with selected specialization already exists`);
    }
  };

  createDoctor = async (doctorData) => {
    const doctor = await this.repository.createDoctor(doctorData);

    return doctor;
  };

  updateDoctor = async (doctorData) => {
    const { name, specializationId, id } = doctorData;

    await this.checkData(doctorData);

    const {
      name: prevName,
      specializationId: prevSpecializationId,
    } = await this.getDoctorById(id);

    const doctor = await this.repository.updateDoctor({
      id,
      name: name === prevName ? null : name,
      specializationId: specializationId === prevSpecializationId
        ? null
        : specializationId,
    });

    return doctor;
  };

  deleteDoctor = async (id) => {
    const doctor = await this.repository.deleteDoctor(id);

    if (!doctor.length) {
      throw new ApiError(404, 'Doctor not found');
    }
  };

  getAllDoctors = async () => {
    const doctors = await this.repository.getAll();

    return doctors;
  };

  getDoctorById = async (id) => {
    const doctor = await this.repository.getById(id);

    if (!doctor) {
      throw new ApiError(404, 'Doctor not found');
    }

    return doctor;
  };

  getDoctorByUserId = async (userId) => {
    const doctor = await this.repository.getByUserId(userId);

    if (!doctor) {
      throw new ApiError(404, 'Doctor not found');
    }

    return doctor;
  };
}
