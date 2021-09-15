export default class MySQLDoctor {
  constructor(db) {
    this.db = db;
    this.Doctor = this.db.doctor;
  }

  getAll = async () => {
    const doctors = await this.Doctor.findAll({
      raw: true,
      include: [
        this.db.specialization,
      ],
    });

    return doctors;
  }

  getById = async (id) => {
    const doctor = await this.Doctor.findOne({
      raw: true,
      where: { id },
      include: [
        this.db.specialization,
      ],
    });

    return doctor;
  }

  getByUserId = async (userId) => {
    const doctor = await this.Doctor.findOne({
      raw: true,
      where: { user_id: userId },
      include: [
        this.db.specialization,
      ],
    });

    return doctor;
  };
}
