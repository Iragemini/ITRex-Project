export default class MySQLPatient {
  constructor(db) {
    this.db = db;
    this.Patient = this.db.patient;
    this.User = this.db.user;
  }

  createPatient = async (data) => {
    const {
      name,
      email,
      gender,
      birthDate,
      userId,
    } = data;
    const [patient] = await this.Patient.findOrCreate({
      where: { user_id: userId },
      defaults: {
        name,
        email,
        gender,
        birth_date: birthDate,
        user_id: userId,
      },
    });
    return patient.id;
  };

  getIdByName = async (name) => {
    const whereStatement = {};
    whereStatement.name = name;

    const patient = await this.Patient.findOne({
      where: whereStatement,
    });
    if (!patient) {
      return null;
    }
    return patient.id;
  };

  getIdByUserId = async (userId) => {
    const patient = await this.Patient.findOne({
      where: { user_id: userId },
    });
    if (!patient) {
      return null;
    }
    return patient.id;
  };

  getPatientById = async (id) => {
    const patient = await this.Patient.findByPk(id);
    if (!patient) {
      return null;
    }
    return patient;
  };
}
