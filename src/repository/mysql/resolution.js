import getExpiration from '../../utils/getExpiration.js';
import ApiError from '../../errors/ApiError.js';

export default class MySQLResolution {
  constructor(db) {
    this.db = db;
    this.Resolution = this.db.resolution;
  }

  async add(data) {
    let expire = null;

    if (data.ttl > 0) {
      expire = new Date(getExpiration(data.ttl));
    }

    let newResolution;

    try {
      newResolution = await this.Resolution.create({ expire, ...data });
    } catch (error) {
      throw new ApiError(500, `ERROR: ${error.original.sqlMessage}`);
    }

    return newResolution;
  }

  async getAllResolutions(query) {
    const { patientName } = query;

    let resolutions;

    if (patientName) {
      const sequelizeQuery = `
      SELECT 
        resolutions.id, 
        resolutions.patientId, 
        resolutions.resolution, 
        resolutions.expire, 
        resolutions.doctorName, 
        resolutions.doctorSpecialization,
        resolutions.createdAt, 
        resolutions.updatedAt
      FROM 
        resolutions 
        INNER JOIN patients ON patients.id = resolutions.patientId 
      WHERE 
        patients.name = "${patientName}"
      `;

      resolutions = await this.db.sequelize.query(sequelizeQuery, {
        raw: true,
        type: this.db.Sequelize.QueryTypes.SELECT,
      });
    } else {
      resolutions = await this.Resolution.findAll({ raw: true });
    }

    return resolutions;
  }

  async getResolutionsByUserId(id) {
    const query = `
    SELECT 
      resolutions.id, 
      resolutions.patientId, 
      resolutions.resolution, 
      resolutions.expire, 
      resolutions.doctorName, 
      resolutions.doctorSpecialization,
      resolutions.createdAt, 
      resolutions.updatedAt 
    FROM 
      resolutions 
      INNER JOIN patients ON patients.id = resolutions.patientId 
    WHERE 
      patients.userId = "${id}"
    `;

    const resolutions = await this.db.sequelize.query(query, {
      raw: true,
      type: this.db.Sequelize.QueryTypes.SELECT,
    });

    return resolutions;
  }

  async removeResolution(id) {
    const resolution = await this.Resolution.destroy({ where: { id } });

    return resolution;
  }
}
