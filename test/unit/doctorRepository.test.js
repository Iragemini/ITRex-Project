import { expect } from 'chai';
import MySQLDoctor from '../../src/repository/mysql/doctor.js';
import db from './mocks/db.mock.js';

const mysqlDoctor = new MySQLDoctor(db);

describe('Doctor repository tests', () => {
  const name = 'Doctor_1';
  const id = 1;
  const userId = 1;
  const title = 'specialization';
  const specializations = [{ title }];
  const doctor = {
    id,
    user_id: userId,
    name,
    specializations,
  };

  const expectedDoctor = {
    id,
    userId,
    name,
    specialization: title,
  };

  describe('Get all doctors', () => {
    it('should return doctor list', async () => {
      db.doctor.findAll.resolves([doctor]);

      expect(await mysqlDoctor.getAll()).to.deep.equal([expectedDoctor]);
      expect(db.doctor.findAll.calledOnce).to.be.true;
    });

    it('should return empty list', async () => {
      db.doctor.findAll.resolves([]);

      expect(await mysqlDoctor.getAll()).to.deep.equal([]);
    });
  });

  describe('Get doctor by id', () => {
    it('should return doctor', async () => {
      db.doctor.findOne.resolves(doctor);

      expect(await mysqlDoctor.getById(id)).to.deep.equal(expectedDoctor);
      expect(db.doctor.findOne.called).to.be.true;
      expect(db.doctor.findOne.calledOnce).to.be.true;
    });

    it('should return null ', async () => {
      db.doctor.findOne.resolves(undefined);

      expect(await mysqlDoctor.getById(id)).to.be.null;
      expect(db.doctor.findOne.called).to.be.true;
    });
  });

  describe('Get doctor by user id', () => {
    it('should return doctor', async () => {
      db.doctor.findOne.resolves(doctor);

      expect(await mysqlDoctor.getByUserId(userId)).to.deep.equal(expectedDoctor);
      expect(db.doctor.findOne.called).to.be.true;
    });

    it('should return null', async () => {
      db.doctor.findOne.resolves(undefined);

      expect(await mysqlDoctor.getByUserId(userId)).to.be.null;
      expect(db.doctor.findOne.called).to.be.true;
    });
  });
});
