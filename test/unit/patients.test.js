import { expect } from 'chai';
import sinon from 'sinon';
import MySQLPatient from '../../src/repository/mysql/patient.js';
import PatientService from '../../src/patient/patient.service.js';
import db from './mocks/db.mock.js';

const mysqlPatient = new MySQLPatient(db);
const patientService = new PatientService(mysqlPatient);

const sandbox = sinon.createSandbox();

describe('Patients tests', () => {
  const name = 'Patient_1';
  const patient = { name };
  const id = 1;

  afterEach(() => {
    sandbox.restore();
  });

  describe('Add patient', () => {
    it('should return patient id', async () => {
      sandbox.replace(mysqlPatient, 'createPatient', () => id);
      const spyCreatePatient = sandbox.spy(mysqlPatient, 'createPatient');

      expect(await patientService.addPatient(patient)).to.equal(id);
      expect(spyCreatePatient.calledOnce).to.be.true;
      expect(spyCreatePatient.calledWith(patient)).to.be.true;
    });
  });

  describe('Get patient id', () => {
    it('should throw an error when there is no such patient', async () => {
      sandbox.replace(mysqlPatient, 'getIdByName', () => null);

      try {
        await patientService.getPatientId(name);
      } catch (err) {
        expect(err.message).to.equal(`Patient ${name} not found`);
      }
    });

    it('should return patient id', async () => {
      sandbox.replace(mysqlPatient, 'getIdByName', () => id);
      const spyGetIdByName = sandbox.spy(mysqlPatient, 'getIdByName');

      expect(await patientService.getPatientId(name)).to.equal(id);
      expect(spyGetIdByName.calledOnce).to.be.true;
      expect(spyGetIdByName.calledWith(name)).to.be.true;
    });
  });

  describe('Get patient name', () => {
    it('should throw an error when there are no patients with specified id', async () => {
      sandbox.replace(mysqlPatient, 'getPatientById', () => null);

      try {
        await patientService.getPatientName(id);
      } catch (err) {
        expect(err.message).to.equal('Patient not found');
      }
    });

    it('should return patient name', async () => {
      sandbox.replace(mysqlPatient, 'getPatientById', () => name);
      const spyGetPatientById = sandbox.spy(mysqlPatient, 'getPatientById');

      expect(await patientService.getPatientName(id)).to.equal(name);
      expect(spyGetPatientById.calledOnce).to.be.true;
      expect(spyGetPatientById.calledWith(id)).to.be.true;
    });
  });
});
