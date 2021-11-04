import getExpiration from '../../utils/getExpiration.js';

export default class PGResolution {
  constructor(pool) {
    this.pool = pool;
  }

  async add(data) {
    const {
      doctorId,
      patientId,
      resolution,
      ttl,
    } = data;

    const expire = ttl > 0
      ? new Date(getExpiration(ttl))
      : null;

    const query = `
      INSERT INTO resolutions(doctor_id, patient_id, resolution, expire) 
      VALUES($1, $2, $3, $4)  RETURNING *
    `;

    const resolutions = await this.pool.query(query, [doctorId, patientId, resolution, expire]);

    return resolutions.rows[0];
  }

  async getAllResolutions(data) {
    const { patientName } = data;

    const WHERE = patientName
      ? `WHERE patients.name = $1 
        AND (
            resolutions.expire IS NULL
            OR resolutions.expire > Now() 
        )`
      : 'WHERE resolutions.expire IS NULL OR resolutions.expire > Now()';

    const params = patientName ? [patientName] : [];

    const query = `
      SELECT 
        resolutions.*, patients.name patient_name,
        di.name doctor_name, di.specialization doctor_specialization
      FROM resolutions 
        LEFT JOIN doctors_info di ON resolutions.doctor_id = di.id 
        INNER JOIN patients ON resolutions.patient_id = patients.id
      ${WHERE}
    `;

    const resolutions = await this.pool.query(query, params);

    return resolutions.rows;
  }

  async getResolutionsByUserId(id) {
    const query = `
      SELECT 
        resolutions.*, patients.name patient_name,
        di.name doctor_name, di.specialization doctor_specialization 
      FROM resolutions 
        LEFT JOIN doctors_info di ON resolutions.doctor_id = di.id 
        INNER JOIN patients ON resolutions.patient_id = patients.id
      WHERE 
        patients.user_id = $1 
        AND (
          resolutions.expire IS NULL 
          OR resolutions.expire > Now()
        )
    `;

    const resolutions = await this.pool.query(query, [id]);

    return resolutions.rows;
  }

  async removeResolution(id) {
    const query = 'DELETE FROM resolutions WHERE id = $1 RETURNING *';

    const resolution = await this.pool.query(query, [id]);

    return resolution.rows;
  }
}
