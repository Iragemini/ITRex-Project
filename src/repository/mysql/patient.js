export default class MySQLPatient {
  constructor(db) {
    this.db = db;
    this.Patient = this.db.patient;
  }

  createPatient = async (data) => {
    const { name } = data;
    const [patient] = await this.Patient.findOrCreate({ name, where: { name } });
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

  /* not used */
  getPatientById = async (id) => {
    const patient = await this.Patient.findByPk(id);
    if (!patient) {
      return null;
    }
    return patient.name;
  };
}
