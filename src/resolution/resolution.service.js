import ApiError from '../errors/ApiError.js';
import config from '../../config/config.js';

const defaultTTL = config.ttl;

export default class ResolutionService {
  constructor(repository, patientService) {
    this.repository = repository;
    this.patientService = patientService;
  }

  addResolution = async (name, resolution, ttl = defaultTTL) => {
    const patientId = await this.patientService.getPatientId(name);
    if (await this.findResolutionById(patientId)) {
      await this.repository.update(patientId, resolution, ttl);
    } else {
      await this.repository.add(patientId, { resolution, ttl });
    }
  };

  deleteResolution = async (name) => {
    const patientId = await this.patientService.getPatientId(name);
    if (!(await this.findResolutionById(patientId))) {
      throw new ApiError(404, `Resolution for ${name} not found`);
    }
    await this.repository.removeResolution(patientId);
  };

  findResolution = async (name) => {
    const patientId = await this.patientService.getPatientId(name);
    const { resolution } = await this.repository.getResolution(patientId);

    return resolution || null;
  };

  findResolutionById = async (patientId) => {
    const { resolution } = await this.repository.getResolution(patientId);
    return resolution || null;
  };

  findResolutionByUserId = async (userId) => {
    const patientId = await this.patientService.getPatientIdByUserId(userId);
    const resolution = await this.findResolutionById(patientId);
    return resolution;
  };
}
