import { expect } from 'chai';
import sinon from 'sinon';
import MySQLDoctor from '../../src/repository/mysql/doctor.js';
import DoctorService from '../../src/doctor/doctor.service.js';
import db from './mocks/db.mock.js';

const mysqlDoctor = new MySQLDoctor(db);
const doctorService = new DoctorService(mysqlDoctor);

const sandbox = sinon.createSandbox();

describe('Doctor tests', () => {
  const name = 'Doctor_1';
  const id = 1;
  const userId = 1;
  const doctor = {
    id,
    name,
    userId,
  };

  afterEach(() => {
    sandbox.restore();
  });

  describe('Get all doctors', () => {
    it('should return an empty list of no doctors', async () => {
      sandbox.replace(mysqlDoctor, 'getAll', () => []);
      const spyGetAll = sandbox.spy(mysqlDoctor, 'getAll');

      expect(await doctorService.getAllDoctors()).to.deep.equal([]);
      expect(spyGetAll.calledOnce).to.be.true;
      expect(spyGetAll.calledWith()).to.be.true;
    });

    it('should return doctors', async () => {
      sandbox.replace(mysqlDoctor, 'getAll', () => [doctor]);
      const spyGetAll = sandbox.spy(mysqlDoctor, 'getAll');

      expect(await doctorService.getAllDoctors()).to.deep.equal([doctor]);
      expect(spyGetAll.calledOnce).to.be.true;
      expect(spyGetAll.calledWith()).to.be.true;
    });
  });

  describe('Get doctor by id', () => {
    it('should throw an error when there is no such doctor', async () => {
      sandbox.replace(mysqlDoctor, 'getById', () => null);

      try {
        await doctorService.getDoctorById(id);
      } catch (err) {
        expect(err.message).to.equal('Doctor not found');
      }
    });

    it('should return doctor', async () => {
      sandbox.replace(mysqlDoctor, 'getById', () => doctor);
      const spyGetById = sandbox.spy(mysqlDoctor, 'getById');

      expect(await doctorService.getDoctorById(id)).to.deep.equal(doctor);
      expect(spyGetById.calledOnce).to.be.true;
      expect(spyGetById.calledWith(id)).to.be.true;
    });
  });

  describe('Get doctor by user id', () => {
    it('should throw an error when there is no such doctor', async () => {
      sandbox.replace(mysqlDoctor, 'getByUserId', () => null);

      try {
        await doctorService.getDoctorByUserId(userId);
      } catch (err) {
        expect(err.message).to.equal('Doctor not found');
      }
    });

    it('should return doctor', async () => {
      sandbox.replace(mysqlDoctor, 'getByUserId', () => (doctor));
      const spyGetByUserId = sandbox.spy(mysqlDoctor, 'getByUserId');

      expect(await doctorService.getDoctorByUserId(userId)).to.deep.equal(doctor);
      expect(spyGetByUserId.calledOnce).to.be.true;
      expect(spyGetByUserId.calledWith(userId)).to.be.true;
    });
  });
});
