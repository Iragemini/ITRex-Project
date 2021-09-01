import { expect } from 'chai';
import MySQLPatient from '../../src/repository/mysql/patient.js';
import db from './mocks/db.mock.js';

const mysqlPatient = new MySQLPatient(db);

describe('Patient repository tests', () => {
  const name = 'Patient_1';
  const id = 1;

  describe('Create patient', () => {
    it('should return id', async () => {
      db.patient.findOrCreate.withArgs({ name, where: { name } }).resolves([{ id }]);
      expect(await mysqlPatient.createPatient({ name })).to.equal(id);
      expect(db.patient.findOrCreate.calledWith({ name, where: { name } })).to.be.true;
      expect(db.patient.findOrCreate.calledOnce).to.be.true;
    });
  });

  describe('Get id by name', () => {
    it('should return id', async () => {
      db.patient.findOne.withArgs({ where: { name } }).resolves({ id });
      expect(await mysqlPatient.getIdByName(name)).to.equal(id);
      expect(db.patient.findOne.calledWith({ where: { name } })).to.be.true;
      expect(db.patient.findOne.calledOnce).to.be.true;
    });

    it('should return null when there are not such patient', async () => {
      db.patient.findOne.withArgs({ where: { name } }).resolves(null);
      expect(await mysqlPatient.getIdByName(name)).to.be.null;
      expect(db.patient.findOne.calledWith({ where: { name } })).to.be.true;
    });
  });

  describe('Get name by id', () => {
    it('should return name', async () => {
      db.patient.findByPk.withArgs(id).resolves({ name });
      expect(await mysqlPatient.getPatientById(id)).to.equal(name);
      expect(db.patient.findByPk.calledWith(id)).to.be.true;
      expect(db.patient.findByPk.calledOnce).to.be.true;
    });

    it('should return null when there are not such patient', async () => {
      db.patient.findByPk.withArgs(id).resolves(null);
      expect(await mysqlPatient.getPatientById(id)).to.be.null;
      expect(db.patient.findByPk.calledWith(id)).to.be.true;
    });
  });
});
