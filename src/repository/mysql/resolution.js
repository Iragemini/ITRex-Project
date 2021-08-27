import isResolutionExpired from '../../utils/resolution.js';
import getExpiration from '../../utils/getExpiration.js';

export default class MySQLResolution {
  constructor(db) {
    this.db = db;
    this.Resolution = this.db.resolution;
  }

  async add(patientId, data) {
    const { resolution, ttl } = data;
    let expire = null;
    if (ttl > 0) {
      const expirems = getExpiration(ttl);
      expire = new Date(expirems);
    }
    await this.Resolution.create({ patient_id: patientId, resolution, expire });
  }

  async removeValue(patientId) {
    await this.update(patientId, '', null);
  }

  async update(patientId, newResolution, ttl) {
    const whereStatement = {};
    let expire = null;
    if (ttl > 0) {
      const expirems = getExpiration(ttl);
      expire = new Date(expirems);
    }
    const resolutions = await this.getAllResolutions(patientId);
    const { id, resolution } = resolutions[0].dataValues;
    whereStatement.id = id;
    const data = { resolution: `${resolution} ${newResolution}`, expire };
    await this.Resolution.update(data, { where: whereStatement });
  }

  async isResolutionExists(patientId) {
    let isExist = false;
    const resolutions = await this.getAllResolutions(patientId);
    if (resolutions.length > 0) {
      isExist = true;
    }
    return isExist;
  }

  async getResolution(patientId) {
    let expireTime = null;
    const resolutions = await this.getAllResolutions(patientId);
    if (resolutions.length === 0) {
      return { resolution: '' };
    }
    const { id, resolution, expire } = resolutions[0];
    if (expire) {
      expireTime = expire.getTime();
    }
    if (isResolutionExpired(expireTime)) {
      await this.removeResolution(id);
      return { resolution: '' };
    }
    return { resolution };
  }

  async getAllResolutions(patientId) {
    const whereStatement = {};
    whereStatement.patient_id = patientId;
    const resolutions = await this.Resolution.findAll({ where: whereStatement });
    return resolutions;
  }

  async removeResolution(patientId) {
    await this.Resolution.destroy({ where: { patient_id: patientId } });
  }
}
