export default class MySQLPatient {
  constructor(db) {
    this.db = db;
    this.Patient = this.db.patient;
  }

  createPatient = async (data) => {
    const patient = await this.Patient.create(data);

    return patient;
  };

  getPatientById = async (id) => {
    const patient = await this.Patient.findByPk(id);

    if (!patient) {
      return null;
    }

    return patient;
  };

  getPatientByUserId = async (userId) => {
    const patient = await this.Patient.findOne({
      raw: true,
      where: { user_id: userId },
    });

    if (!patient) {
      return null;
    }

    return patient;
  };
}
