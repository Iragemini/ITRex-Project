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
      expire = new Date(getExpiration(ttl));
    }
    await this.Resolution.create({ patient_id: patientId, resolution, expire });
  }

  async update(patientId, newResolution, ttl) {
    let expire = null;
    if (ttl > 0) {
      expire = new Date(getExpiration(ttl));
    }
    const result = await this.getOneResolution(patientId);
    const { id, resolution } = result;
    const data = { resolution: `${resolution} ${newResolution}`, expire };
    await this.Resolution.update(data, { where: { id } });
  }

  async isResolutionExists(patientId) {
    let isExist = false;
    const resolution = await this.getOneResolution(patientId);
    if (resolution) {
      isExist = true;
    }
    return isExist;
  }

  async getResolution(patientId) {
    let expireTime = null;
    const result = await this.getOneResolution(patientId);
    if (!result) {
      return { resolution: '' };
    }
    const { resolution, expire } = result;
    if (expire) {
      expireTime = expire.getTime();
    }
    if (isResolutionExpired(expireTime)) {
      await this.removeResolution(result.patient_id);
      return { resolution: '' };
    }
    return { resolution };
  }

  async getOneResolution(patientId) {
    const resolution = await this.Resolution.findOne({ where: { patient_id: patientId } });
    return resolution;
  }

  async removeResolution(patientId) {
    await this.Resolution.destroy({ where: { patient_id: patientId } });
  }
}
