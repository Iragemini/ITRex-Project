import { expect } from 'chai';
import MySQLPatient from '../../src/repository/mysql/patient.js';
import db from './mocks/db.mock.js';

const mysqlPatient = new MySQLPatient(db);

describe('Patient repository tests', () => {
  const name = 'Patient_1';
  const id = 1;
  const dataValues = { dataValues: { id } };

  describe('Create patient', () => {
    it('should return id', async () => {
      db.patient.findOrCreate.withArgs({ name, where: { name } }).resolves([dataValues]);
      expect(await mysqlPatient.createPatient({ name })).to.equal(id);
    });
  });

  describe('Get id by name', () => {
    it('should return id', async () => {
      db.patient.findOne.withArgs({ where: { name } }).resolves(dataValues);
      expect(await mysqlPatient.getIdByName(name)).to.equal(id);
    });
  });

  describe('Get name by id', () => {
    it('should return name', async () => {
      db.patient.findByPk.withArgs(id).resolves({ dataValues: { name } });
      expect(await mysqlPatient.getPatientById(id)).to.equal(name);
    });
  });
});
