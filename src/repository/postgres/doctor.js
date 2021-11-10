export default class PGDoctor {
  constructor(pool) {
    this.pool = pool;
  }

  static mapper(doctorInfo) {
    const {
      id,
      user_id: userId,
      name,
      title: specialization,
      specialization_id: specializationId,
    } = doctorInfo;

    return {
      id,
      userId,
      name,
      specialization,
      specializationId,
    };
  }

  createDoctor = async (data) => {
    const {
      userId,
      specializationId,
      name,
    } = data;

    const query = `
      INSERT INTO doctors(user_id, specialization_id, name) 
      VALUES($1, $2, $3) RETURNING *
    `;
    const newDoctor = await this.pool.query(query, [userId, specializationId, name]);

    return newDoctor.rows[0];
  };

  updateDoctor = async (data) => {
    const { specializationId, name, id } = data;

    const WHERE = ` WHERE id=${id} RETURNING *`;
    let query = 'UPDATE doctors SET ';
    let comma = '';

    if (name) {
      query += `name='${name}'`;
      comma = ',';
    }

    if (specializationId) {
      query += `${comma} specialization_id=${specializationId}`;
    }

    query += WHERE;

    const updatedDoctor = await this.pool.query(query);

    return updatedDoctor.rows[0];
  };

  deleteDoctor = async (id) => {
    const deletedDoctor = await this.pool.query('DELETE FROM doctors WHERE id=$1 RETURNING *', [id]);

    return deletedDoctor.rows;
  }

  getAll = async () => {
    const query = `
      SELECT doctors.*, specializations.title 
      FROM doctors INNER JOIN specializations 
        ON doctors.specialization_id=specializations.id
    `;

    const doctors = await this.pool.query(query);

    return doctors.rows.map((doctor) => PGDoctor.mapper(doctor));
  };

  getById = async (id) => {
    const query = `
      SELECT doctors.*, specializations.title 
      FROM doctors INNER JOIN specializations 
        ON doctors.specialization_id=specializations.id 
      WHERE doctors.id = $1
    `;

    const doctor = await this.pool.query(query, [id]);

    if (!doctor.rows.length) {
      return null;
    }

    const {
      rows: [doctorInfo],
    } = doctor;

    return PGDoctor.mapper(doctorInfo);
  };

  getByUserId = async (userId) => {
    const query = `
      SELECT doctors.*, specializations.title 
      FROM doctors INNER JOIN specializations 
        ON doctors.specialization_id=specializations.id 
      WHERE doctors.user_id=$1
    `;

    const doctor = await this.pool.query(query, [userId]);

    if (!doctor.rows.length) {
      return null;
    }

    const {
      rows: [doctorInfo],
    } = doctor;

    return PGDoctor.mapper(doctorInfo);
  };

  getByNameAndSpecId = async (doctorData) => {
    const { name, specializationId } = doctorData;

    const query = 'SELECT * FROM doctors WHERE name=$1 AND specialization_id=$2';

    const doctor = await this.pool.query(query, [name, specializationId]);

    return doctor.rows;
  }
}
