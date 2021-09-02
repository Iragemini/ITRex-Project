import ApiError from '../errors/ApiError.js';
import config from '../../config/config.js';

const defaultTTL = config.ttl;

export default class ResolutionService {
  constructor(storage, patientService) {
    this.storage = storage;
    this.patientService = patientService;
  }

  addResolution = async (name, resolution, ttl = defaultTTL) => {
    const patientId = await this.patientService.getPatientId(name);
    if (await this.findResolutionById(patientId)) {
      await this.storage.update(patientId, resolution, ttl);
    } else {
      await this.storage.add(patientId, { resolution, ttl });
    }
  };

  deleteResolution = async (name) => {
    const patientId = await this.patientService.getPatientId(name);
    if (!(await this.findResolutionById(patientId))) {
      throw new ApiError(404, `Resolution for ${name} not found`);
    }
    await this.storage.removeResolution(patientId);
  };

  findResolution = async (name) => {
    const patientId = await this.patientService.getPatientId(name);
    const { resolution } = await this.storage.getResolution(patientId);

    return resolution || null;
  };

  findResolutionById = async (patientId) => {
    const { resolution } = await this.storage.getResolution(patientId);
    return resolution || null;
  };
}
