import { expect } from 'chai';
import MySQLPatient from '../../src/repository/mysql/patient.js';
import db from './mocks/db.mock.js';

const mysqlPatient = new MySQLPatient(db);

describe('Patient repository tests', () => {
  const name = 'Patient_1';
  const email = 'email@email.com';
  const gender = 'male';
  const birthDate = new Date();
  const id = 1;
  const userId = 777;
  const user = {
    name,
    email,
    gender,
    birthDate,
    userId,
  };

  describe('Create patient', () => {
    it('should return patient', async () => {
      db.patient.create.resolves({ id, ...user });
      expect(await mysqlPatient.createPatient(user)).to.deep.equal({ id, ...user });
      expect(db.patient.create.calledWith(user)).to.be.true;
      expect(db.patient.create.calledOnce).to.be.true;
    });
  });

  describe('Get patient by id', () => {
    it('should return patient', async () => {
      db.patient.findByPk.withArgs(id).resolves({ id, ...user });
      expect(await mysqlPatient.getPatientById(id)).to.deep.equal({ id, ...user });
      expect(db.patient.findByPk.calledWith(id)).to.be.true;
      expect(db.patient.findByPk.calledOnce).to.be.true;
    });

    it('should return null when there are not such patient', async () => {
      db.patient.findByPk.withArgs(id).resolves(null);
      expect(await mysqlPatient.getPatientById(id)).to.be.null;
      expect(db.patient.findByPk.calledWith(id)).to.be.true;
    });
  });

  describe('Get patient by user id', () => {
    it('should return patient', async () => {
      db.patient.findOne.withArgs({
        raw: true,
        where: { userId },
      }).resolves({ id, ...user });
      expect(await mysqlPatient.getPatientByUserId(userId)).to.deep.equal({ id, ...user });
      expect(db.patient.findOne.calledWith({
        raw: true,
        where: { userId },
      })).to.be.true;
      expect(db.patient.findOne.calledOnce).to.be.true;
    });

    it('should return null when there are not such patient', async () => {
      db.patient.findOne.withArgs({
        raw: true,
        where: { userId },
      }).resolves(null);
      expect(await mysqlPatient.getPatientByUserId(userId)).to.be.null;
      expect(db.patient.findOne.calledWith({
        raw: true,
        where: { userId },
      })).to.be.true;
    });
  });
});
