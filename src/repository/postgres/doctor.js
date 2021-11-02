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
    } = doctorInfo;

    return {
      id,
      userId,
      name,
      specialization,
    };
  }

  getAll = async () => {
    const query = `
      SELECT doctors.*, specializations.title 
      FROM doctors INNER JOIN specializations 
        ON doctors.specialization_id = specializations.id
    `;

    const doctors = await this.pool.query(query);

    return doctors.rows.map((doctor) => PGDoctor.mapper(doctor));
  };

  getById = async (id) => {
    const query = `
      SELECT doctors.*, specializations.title 
      FROM doctors INNER JOIN specializations 
        ON doctors.specialization_id = specializations.id 
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
        ON doctors.specialization_id = specializations.id 
      WHERE doctors.user_id = $1
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
}
