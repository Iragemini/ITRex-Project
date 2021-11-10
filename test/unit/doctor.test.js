import { expect } from 'chai';
import sinon from 'sinon';
import MySQLDoctor from '../../src/repository/mysql/doctor.js';
import PGDoctor from '../../src/repository/postgres/doctor.js';
import DoctorService from '../../src/doctor/doctor.service.js';
import db, { pool } from './mocks/db.mock.js';
import config from '../../config/config.js';
import constants from '../../src/utils/constants.js';

const {
  db: { dbType },
} = config;

const repository = dbType === constants.repositoryTypes.mysql
  ? new MySQLDoctor(db)
  : new PGDoctor(pool);

const doctorService = new DoctorService(repository);

const sandbox = sinon.createSandbox();

describe('Doctor tests', () => {
  const name = 'Doctor_1';
  const id = 1;
  const userId = 1;
  const specialization = 'specialization';
  const specializationId = 1;
  const doctor = {
    id,
    userId,
    name,
    specialization,
    specializationId,
  };

  afterEach(() => {
    sandbox.restore();
  });

  describe('Get all doctors', () => {
    it('should return an empty list of no doctors', async () => {
      sandbox.replace(repository, 'getAll', () => []);
      const spyGetAll = sandbox.spy(repository, 'getAll');

      expect(await doctorService.getAllDoctors()).to.deep.equal([]);
      expect(spyGetAll.calledOnce).to.be.true;
      expect(spyGetAll.calledWith()).to.be.true;
    });

    it('should return doctors', async () => {
      sandbox.replace(repository, 'getAll', () => [doctor]);
      const spyGetAll = sandbox.spy(repository, 'getAll');

      expect(await doctorService.getAllDoctors()).to.deep.equal([doctor]);
      expect(spyGetAll.calledOnce).to.be.true;
      expect(spyGetAll.calledWith()).to.be.true;
    });
  });

  describe('Get doctor by id', () => {
    it('should throw an error when there is no such doctor', async () => {
      sandbox.replace(repository, 'getById', () => null);

      try {
        await doctorService.getDoctorById(id);
      } catch (err) {
        expect(err.message).to.equal('Doctor not found');
      }
    });

    it('should return doctor', async () => {
      sandbox.replace(repository, 'getById', () => doctor);
      const spyGetById = sandbox.spy(repository, 'getById');

      expect(await doctorService.getDoctorById(id)).to.deep.equal(doctor);
      expect(spyGetById.calledOnce).to.be.true;
      expect(spyGetById.calledWith(id)).to.be.true;
    });
  });

  describe('Get doctor by user id', () => {
    it('should throw an error when there is no such doctor', async () => {
      sandbox.replace(repository, 'getByUserId', () => null);

      try {
        await doctorService.getDoctorByUserId(userId);
      } catch (err) {
        expect(err.message).to.equal('Doctor not found');
      }
    });

    it('should return doctor', async () => {
      sandbox.replace(repository, 'getByUserId', () => (doctor));
      const spyGetByUserId = sandbox.spy(repository, 'getByUserId');

      expect(await doctorService.getDoctorByUserId(userId)).to.deep.equal(doctor);
      expect(spyGetByUserId.calledOnce).to.be.true;
      expect(spyGetByUserId.calledWith(userId)).to.be.true;
    });
  });

  describe('Create doctor', () => {
    it('should create doctor', async () => {
      const data = {
        userId,
        specializationId,
        name,
      };
      sandbox.replace(repository, 'createDoctor', () => doctor);
      const spyCreateDoctor = sandbox.spy(repository, 'createDoctor');

      expect(await doctorService.createDoctor(data)).to.deep.equal(doctor);
      expect(spyCreateDoctor.calledOnce).to.be.true;
    });
  });

  describe('Update doctor', () => {
    it('should update doctor specialization', async () => {
      const newSpecializationId = 2;
      const newSpecialization = 'new specialization';

      const data = {
        name,
        specializationId: newSpecializationId,
        id,
      };
      const expectedDoctor = {
        id,
        userId,
        name,
        specialization: newSpecialization,
        specializationId: newSpecializationId,
      };

      sandbox.replace(doctorService, 'checkData', () => undefined);
      sandbox.replace(doctorService, 'getDoctorById', () => doctor);
      sandbox.replace(repository, 'updateDoctor', () => expectedDoctor);

      const spyGetDoctorById = sandbox.spy(doctorService, 'getDoctorById');
      const spyCheckData = sandbox.spy(doctorService, 'checkData');

      expect(await doctorService.updateDoctor(data)).to.deep.equal(expectedDoctor);
      expect(spyCheckData.calledBefore(spyGetDoctorById)).to.be.true;
    });

    it('should update doctor name', async () => {
      const newName = 'Doctor_new';

      const data = {
        name: newName,
        specializationId,
        id,
      };
      const expectedDoctor = {
        id,
        userId,
        name: newName,
        specialization,
        specializationId,
      };

      sandbox.replace(doctorService, 'checkData', () => undefined);
      sandbox.replace(doctorService, 'getDoctorById', () => doctor);
      sandbox.replace(repository, 'updateDoctor', () => expectedDoctor);

      const spyGetDoctorById = sandbox.spy(doctorService, 'getDoctorById');
      const spyCheckData = sandbox.spy(doctorService, 'checkData');

      expect(await doctorService.updateDoctor(data)).to.deep.equal(expectedDoctor);
      expect(spyCheckData.calledBefore(spyGetDoctorById)).to.be.true;
    });

    it('should update doctor name && specialization', async () => {
      const newName = 'Doctor_new';
      const newSpecializationId = 2;
      const newSpecialization = 'new specialization';

      const data = {
        name: newName,
        specializationId: newSpecializationId,
        id,
      };
      const expectedDoctor = {
        id,
        userId,
        name: newName,
        specialization: newSpecialization,
        specializationId: newSpecializationId,
      };

      sandbox.replace(doctorService, 'checkData', () => undefined);
      sandbox.replace(doctorService, 'getDoctorById', () => doctor);
      sandbox.replace(repository, 'updateDoctor', () => expectedDoctor);

      const spyGetDoctorById = sandbox.spy(doctorService, 'getDoctorById');
      const spyCheckData = sandbox.spy(doctorService, 'checkData');

      expect(await doctorService.updateDoctor(data)).to.deep.equal(expectedDoctor);
      expect(spyCheckData.calledBefore(spyGetDoctorById)).to.be.true;
    });

    it('should throw error when doctor with such name and specialization exists', async () => {
      const data = {
        name,
        specializationId,
        id,
      };

      sandbox.replace(repository, 'getByNameAndSpecId', () => [doctor]);

      const spyGetByNameAndSpecId = sandbox.spy(repository, 'getByNameAndSpecId');

      try {
        await doctorService.updateDoctor(data);
        expect(spyGetByNameAndSpecId.threw()).to.be.true;
      } catch (err) {
        expect(err.message).to.equal(`Doctor ${data.name} with selected specialization already exists`);
      }
    });
  });
});
