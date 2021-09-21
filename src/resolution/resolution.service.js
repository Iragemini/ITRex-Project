import config from '../../config/config.js';
import ApiError from '../errors/ApiError.js';

const defaultTTL = config.ttl;

export default class ResolutionService {
  constructor(repository, patientService, doctorService) {
    this.repository = repository;
    this.patientService = patientService;
    this.doctorService = doctorService;
  }

  addResolution = async (body, doctorUserId) => {
    const doctor = await this.doctorService.getDoctorByUserId(doctorUserId);

    const data = body;
    data.doctor_name = doctor.name;
    data.doctor_specialization = doctor.specialization;

    data.patient_id = body.patientId;

    if (!body.ttl) {
      data.ttl = defaultTTL;
    } else {
      data.ttl = body.ttl;
    }

    const resolution = await this.repository.add(data);

    return resolution;
  };

  findAllResolutions = async (query) => {
    const resolutions = await this.repository.getAllResolutions(query);

    if (resolutions.length === 0) {
      return [];
    }

    return resolutions;
  };

  findResolutionsByUserId = async (userId) => {
    const resolutions = await this.repository.getResolutionsByUserId(userId);

    if (resolutions.length === 0) {
      return [];
    }

    return resolutions;
  };

  deleteResolutionById = async (id) => {
    const resolution = await this.repository.removeResolution(id);

    if (resolution === 0) {
      // sequelize-specific case, it returns 0 if no rows were destroyed
      throw new ApiError(404, 'Resolution not found');
    }

    return resolution;
  };
}
