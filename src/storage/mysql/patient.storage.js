import db from '../../models/index.js';

export default class MySQLPatient {
  constructor() {
    this.db = db;
    this.Patient = db.patient;
  }

  createPatient = async (name) => {
    const patient = await this.Patient.findOrCreate({ name });
    console.log('createPatient patient', patient);
  };

  getIdByName = async (name) => {
    const whereStatement = {};
    whereStatement.name = name;

    const patient = await this.Patient.findAll({
      where: whereStatement,
    });
    console.log('getIdByName patient', patient);
  };

  getPatientById = async (id) => {
    const patient = await this.Patient.findByPk(id, { include: ['resolution'] });
    console.log('getPatientById patient', patient);
  };
}
