export default class MySQLDoctor {
  constructor(db) {
    this.db = db;
    this.doctor = this.db.doctor;
  }

  static mapper(doctor) {
    const {
      id,
      user_id: userId,
      name,
      specializations: [{ title }],
    } = doctor;

    return {
      id,
      userId,
      name,
      title,
    };
  }

  getAll = async () => {
    const doctors = await this.doctor.findAll({
      include: [
        {
          model: this.db.specialization,
          attributes: ['title'],
        },
      ],
    });

    const result = doctors.map((doctor) => MySQLDoctor.mapper(doctor));

    return result;
  };

  getById = async (id) => {
    const foundDoctor = await this.doctor.findOne({
      where: { id },
      include: [
        {
          model: this.db.specialization,
          attributes: ['title'],
        },
      ],
    });
    if (!foundDoctor) {
      return null;
    }

    return MySQLDoctor.mapper(foundDoctor);
  };

  getByUserId = async (userId) => {
    const foundDoctor = await this.doctor.findOne({
      where: { user_id: userId },
      include: [
        {
          model: this.db.specialization,
          attributes: ['title'],
        },
      ],
    });

    if (!foundDoctor) {
      return null;
    }

    return MySQLDoctor.mapper(foundDoctor);
  };
}
