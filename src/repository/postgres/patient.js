export default class PGPatient {
  constructor(pool) {
    this.pool = pool;
  }

  createPatient = async (data) => {
    const {
      userId,
      name,
      gender,
      birthDate,
    } = data;

    const query = `
      INSERT INTO patients(user_id, name, gender, birth_date) 
      VALUES ($1, $2, $3, $4) RETURNING *
    `;

    const patient = await this.pool.query(query, [
      userId,
      name,
      gender,
      birthDate,
    ]);

    return patient.rows;
  };

  getPatientById = async (id) => {
    const query = 'SELECT * FROM patients WHERE id=$1';

    const patient = await this.pool.query(query, [id]);

    if (!patient.rows.length) {
      return null;
    }

    return patient.rows[0];
  };

  getPatientByUserId = async (userId) => {
    const query = 'SELECT * FROM patients WHERE user_id=$1';

    const patient = await this.pool.query(query, [userId]);

    if (!patient.rows.length) {
      return null;
    }

    return patient.rows[0];
  };
}
