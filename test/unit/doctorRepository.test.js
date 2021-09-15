import { expect } from 'chai';
import MySQLDoctor from '../../src/repository/mysql/doctor.js';
import db from './mocks/db.mock.js';

const mysqlDoctor = new MySQLDoctor(db);

describe('Doctor repository tests', () => {
  const name = 'Doctor_1';
  const id = 1;
  const userId = 1;
  const doctor = {
    id,
    name,
    userId,
  };

  describe('Get all doctors', () => {
    it('should return doctor list', async () => {
      db.doctor.findAll.resolves([doctor]);

      expect(await mysqlDoctor.getAll()).to.deep.equal([doctor]);
      expect(db.doctor.findAll.calledOnce).to.be.true;
    });

    it('should return empty list', async () => {
      db.doctor.findAll.resolves([]);

      expect(await mysqlDoctor.getAll()).to.deep.equal([]);
    });
  });

  describe('Get doctor by id', () => {
    it('should return doctor', async () => {
      db.doctor.findOne.withArgs({
        raw: true,
        where: { id },
        include: [
          db.specialization,
        ],
      }).resolves(doctor);

      expect(await mysqlDoctor.getById(id)).to.deep.equal(doctor);
      expect(db.doctor.findOne.calledWith({
        raw: true,
        where: { id },
        include: [
          db.specialization,
        ],
      })).to.be.true;
      expect(db.doctor.findOne.calledOnce).to.be.true;
    });

    it('should return undefined ', async () => {
      db.doctor.findOne.withArgs({
        raw: true,
        where: { id },
        include: [
          db.specialization,
        ],
      }).resolves(undefined);

      expect(await mysqlDoctor.getById(id)).to.be.undefined;
      expect(db.doctor.findOne.calledWith({
        raw: true,
        where: { id },
        include: [
          db.specialization,
        ],
      })).to.be.true;
    });
  });

  describe('Get doctor by user id', () => {
    it('should return doctor', async () => {
      db.doctor.findOne.withArgs({
        raw: true,
        where: { user_id: userId },
        include: [
          db.specialization,
        ],
      }).resolves(doctor);

      expect(await mysqlDoctor.getByUserId(userId)).to.deep.equal(doctor);
      expect(db.doctor.findOne.calledWith({
        raw: true,
        where: { user_id: userId },
        include: [
          db.specialization,
        ],
      })).to.be.true;
    });

    it('should return undefined', async () => {
      db.doctor.findOne.withArgs({
        raw: true,
        where: { user_id: userId },
        include: [
          db.specialization,
        ],
      }).resolves(undefined);

      expect(await mysqlDoctor.getByUserId(userId)).to.be.undefined;
      expect(db.doctor.findOne.calledWith({
        raw: true,
        where: { user_id: userId },
        include: [
          db.specialization,
        ],
      })).to.be.true;
    });
  });
});
