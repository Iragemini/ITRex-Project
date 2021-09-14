import getExpiration from '../../utils/getExpiration.js';

export default class MySQLResolution {
  constructor(db) {
    this.db = db;
    this.Resolution = this.db.resolution;
    this.sequelize = db.sequelize;
  }

  async add(data) {
    let expire = null;

    if (data.ttl > 0) {
      expire = new Date(getExpiration(data.ttl));
    }

    return this.Resolution.create({ expire, ...data });
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
        INNER JOIN patients ON patients.id = resolutions.patientid 
      WHERE 
        patients.name = "${patientName}" 
        AND (
          resolutions.expire IS NULL
          OR resolutions.expire > Now() 
        )
      `;

      resolutions = await this.db.sequelize.query(sequelizeQuery, {
        raw: true,
        type: this.sequelize.QueryTypes.SELECT,
      });
    } else {
      resolutions = await this.Resolution.findAll({ raw: true });
    }

    return resolutions;
  }

  async getResolutionsByUserId(id) {
    const query = `
    SELECT 
      resolutions.* 
    FROM 
      resolutions 
      INNER JOIN patients ON patients.id = resolutions.patientId 
    WHERE 
      patients.userId = "${id}" 
      AND (
        resolutions.expire IS NULL 
        OR resolutions.expire > Now()
      )
    `;

    const resolutions = await this.db.sequelize.query(query, {
      raw: true,
      type: this.sequelize.QueryTypes.SELECT,
    });

    return resolutions;
  }

  async removeResolution(id) {
    const resolution = await this.Resolution.destroy({ where: { id } });

    return resolution;
  }
}
