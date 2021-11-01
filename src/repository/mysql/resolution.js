import getExpiration from '../../utils/getExpiration.js';

export default class MySQLResolution {
  constructor(db) {
    this.db = db;
    this.resolution = this.db.resolution;
    this.sequelize = this.db.sequelize;
  }

  async add(data) {
    const resolutionData = {
      doctor_name: data.doctorName,
      doctor_specialization: data.doctorSpecialization,
      patient_id: data.patientId,
      ttl: data.ttl,
      resolution: data.resolution,
    };

    const expire = resolutionData.ttl > 0
      ? new Date(getExpiration(resolutionData.ttl))
      : null;

    return this.resolution.create({ expire, ...resolutionData });
  }

  async getAllResolutions(query) {
    const { patientName } = query;

    let resolutions;

    if (patientName) {
      const sequelizeQuery = `
      SELECT 
        resolutions.* 
      FROM 
        resolutions 
        INNER JOIN patients ON patients.id = resolutions.patient_id 
      WHERE 
        patients.name = "${patientName}" 
        AND (
          resolutions.expire IS NULL
          OR resolutions.expire > Now() 
        )
      `;

      resolutions = await this.sequelize.query(sequelizeQuery, {
        raw: true,
        type: this.sequelize.QueryTypes.SELECT,
      });
    } else {
      resolutions = await this.resolution.findAll({ raw: true });
    }

    return resolutions;
  }

  async getResolutionsByUserId(id) {
    const query = `
    SELECT 
      resolutions.* 
    FROM 
      resolutions 
      INNER JOIN patients ON patients.id = resolutions.patient_id
    WHERE 
      patients.user_id = "${id}" 
      AND (
        resolutions.expire IS NULL 
        OR resolutions.expire > Now()
      )
    `;

    const resolutions = await this.sequelize.query(query, {
      raw: true,
      type: this.sequelize.QueryTypes.SELECT,
    });

    return resolutions;
  }

  async removeResolution(id) {
    const deletedResolution = await this.resolution.destroy({ where: { id } });

    return deletedResolution;
  }
}
