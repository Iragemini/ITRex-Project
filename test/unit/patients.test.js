import { expect } from 'chai';
import sinon from 'sinon';
import MySQLPatient from '../../src/repository/mysql/patient.js';
import PGPatient from '../../src/repository/postgres/patient.js';
import PatientService from '../../src/patient/patient.service.js';
import db, { pool } from './mocks/db.mock.js';
import config from '../../config/config.js';
import constants from '../../src/utils/constants.js';

const {
  db: { dbType },
} = config;

const repository = dbType === constants.repositoryTypes.mysql
  ? new MySQLPatient(db)
  : new PGPatient(pool);

const patientService = new PatientService(repository);

const sandbox = sinon.createSandbox();

describe('Patients tests', () => {
  const name = 'Patient_1';
  const email = 'email@email.com';
  const gender = 'male';
  const birthDate = new Date();
  const id = 1;
  const userId = 777;
  const patient = {
    id,
    name,
    email,
    gender,
    birthDate,
    userId,
  };

  afterEach(() => {
    sandbox.restore();
  });

  describe('Add patient', () => {
    it('should return patient', async () => {
      sandbox.replace(repository, 'createPatient', () => patient);
      const spyCreatePatient = sandbox.spy(repository, 'createPatient');

      expect(await patientService.addPatient(patient)).to.deep.equal(patient);
      expect(spyCreatePatient.calledOnce).to.be.true;
      expect(spyCreatePatient.calledWith(patient)).to.be.true;
    });
  });

  describe('Get patient by id', () => {
    it('should throw an error when there is no such patient', async () => {
      sandbox.replace(repository, 'getPatientById', () => null);

      try {
        await patientService.getPatientById(id);
      } catch (err) {
        expect(err.message).to.equal('Patient not found');
      }
    });

    it('should return patient', async () => {
      sandbox.replace(repository, 'getPatientById', () => patient);
      const spyGetIdByName = sandbox.spy(repository, 'getPatientById');

      expect(await patientService.getPatientById(id)).to.deep.equal(patient);
      expect(spyGetIdByName.calledOnce).to.be.true;
      expect(spyGetIdByName.calledWith(id)).to.be.true;
    });
  });

  describe('Get patient by user id', () => {
    it('should throw an error when there are no patients with specified id', async () => {
      sandbox.replace(repository, 'getPatientByUserId', () => null);

      try {
        await patientService.getPatientByUserId(userId);
      } catch (err) {
        expect(err.message).to.equal('Patient not found');
      }
    });

    it('should return patient', async () => {
      sandbox.replace(repository, 'getPatientByUserId', () => (patient));
      const spyGetPatientById = sandbox.spy(repository, 'getPatientByUserId');

      expect(await patientService.getPatientByUserId(userId)).to.deep.equal(patient);
      expect(spyGetPatientById.calledOnce).to.be.true;
      expect(spyGetPatientById.calledWith(userId)).to.be.true;
    });
  });
});
