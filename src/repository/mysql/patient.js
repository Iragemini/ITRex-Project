export default class MySQLPatient {
  constructor(db) {
    this.db = db;
    this.patient = this.db.patient;
  }

  createPatient = async (data) => {
    const patientData = {
      name: data.name,
      gender: data.gender,
      birth_date: data.birthDate,
      email: data.email,
      user_id: data.userId,
    };

    const newPatient = await this.patient.create(patientData);

    return newPatient;
  };

  getPatientById = async (id) => {
    const foundPatient = await this.patient.findByPk(id);

    if (!foundPatient) {
      return null;
    }

    return foundPatient;
  };

  getPatientByUserId = async (userId) => {
    const foundPatient = await this.patient.findOne({
      raw: true,
      where: { user_id: userId },
    });

    if (!foundPatient) {
      return null;
    }

    return foundPatient;
  };
}
