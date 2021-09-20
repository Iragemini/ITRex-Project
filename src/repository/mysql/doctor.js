export default class MySQLDoctor {
  constructor(db) {
    this.db = db;
    this.Doctor = this.db.doctor;
  }

  getAll = async () => {
    const result = [];

    const doctors = await this.Doctor.findAll({
      include: [
        {
          model: this.db.specialization,
          attributes: ['title'],
        },
      ],
    });

    doctors.forEach((doctor) => {
      result.push({
        id: doctor.id,
        userId: doctor.user_id,
        name: doctor.name,
        specialization: doctor.specializations[0].title,
      });
    });

    return result;
  };

  getById = async (id) => {
    const doctor = await this.Doctor.findOne({
      where: { id },
      include: [
        {
          model: this.db.specialization,
          attributes: ['title'],
        },
      ],
    });

    return doctor;
  };

  getByUserId = async (userId) => {
    const doctor = await this.Doctor.findOne({
      where: { user_id: userId },
      include: [
        {
          model: this.db.specialization,
          attributes: ['title'],
        },
      ],
    });

    return doctor;
  };
}
