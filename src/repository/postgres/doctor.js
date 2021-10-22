export default class PGDoctor {
  constructor(pool) {
    this.pool = pool;
  }

  getAll = async () => {
    const result = [];

    const query = `
      SELECT doctors.*, specializations.title 
      FROM doctors INNER JOIN specializations 
        ON doctors.specialization_id = specializations.id
    `;

    const doctors = await this.pool.query(query);

    doctors.rows.forEach((doctor) => {
      result.push({
        id: doctor.id,
        userId: doctor.user_id,
        name: doctor.name,
        specialization: doctor.title,
      });
    });

    return result;
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

    const result = {
      id: doctorInfo.id,
      userId: doctorInfo.user_id,
      name: doctorInfo.name,
      specialization: doctorInfo.title,
    };

    return result;
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

    const result = {
      id: doctorInfo.id,
      userId: doctorInfo.user_id,
      name: doctorInfo.name,
      specialization: doctorInfo.title,
    };

    return result;
  };
}
