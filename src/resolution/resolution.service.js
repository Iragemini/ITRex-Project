import config from '../../config/config.js';
import isResolutionExpired from '../utils/resolution.js';

const defaultTTL = config.ttl;

export default class ResolutionService {
  constructor(repository, patientService) {
    this.repository = repository;
    this.patientService = patientService;
  }

  async checkForNotExpiredOrDelete(resolution) {
    let expireTime;

    if (resolution.expire) {
      expireTime = resolution.expire.getTime();
    }

    if (isResolutionExpired(expireTime)) {
      await this.deleteResolutionById(resolution.id);

      return false;
    }

    return true;
  }

  async filterResolutionsArrayByExpiry(resolutions) {
    const data = await Promise.all(
      resolutions.map(async (resolution) => {
        const notExpired = await this.checkForNotExpiredOrDelete(resolution);

        if (notExpired) {
          return resolution;
        }

        return undefined;
      }),
    );

    const filteredResolutions = data.filter(
      (resolution) => resolution !== undefined,
    );

    return filteredResolutions;
  }

  addResolution = async (body, doctor) => {
    const data = body;
    data.doctorName = doctor.name;
    data.doctorSpecialization = doctor['specializations.title'];

    if (!body.ttl) { data.ttl = defaultTTL; } else {
      data.ttl = body.ttl;
    }

    const resolution = await this.repository.add(data);

    return resolution;
  };

  getAllResolutions = async (query) => {
    const resolutions = await this.repository.getAllResolutions(query);

    if (resolutions.length !== 0) {
      return this.filterResolutionsArrayByExpiry(resolutions);
    }

    return resolutions;
  };

  getResolutionsByUserId = async (userId) => {
    const resolutions = await this.repository.getResolutionsByUserId(userId);

    if (resolutions.length !== 0) {
      return this.filterResolutionsArrayByExpiry(resolutions);
    }

    return resolutions;
  };

  deleteResolutionById = async (id) => {
    const resolution = await this.repository.removeResolution(id);

    return resolution;
  };
}
