export default class MySQLPatient {
  constructor(db) {
    this.db = db;
    this.Patient = this.db.patient;
  }

  createPatient = async (data) => {
    const { name } = data;
    const patient = await this.Patient.create({ name });
    return patient.dataValues.id;
  };

  getIdByName = async (name) => {
    const whereStatement = {};
    whereStatement.name = name;

    const patient = await this.Patient.findAll({
      where: whereStatement,
    });
    if (patient.length === 0) {
      return null;
    }
    return patient[0].dataValues.id;
  };

  getPatientById = async (id) => {
    const patient = await this.Patient.findByPk(id);
    const result = patient.dataValues;
    if (!result.name) {
      return null;
    }
    return result.name;
  };
}
