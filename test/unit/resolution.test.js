import { expect } from 'chai';
import sinon from 'sinon';
import patientService from '../../src/patient/index.js';
import db from './mocks/db.mock.js';
import MySQLResolution from '../../src/repository/mysql/resolution.js';
import ResolutionService from '../../src/resolution/resolution.service.js';

const mysqlResolution = new MySQLResolution(db);
const resolutionService = new ResolutionService(mysqlResolution, patientService);

const sandbox = sinon.createSandbox();

describe('Resolution tests', () => {
  const patient = 'Patient_1';
  const resolution = 'resolution';
  const currentId = 1;
  let ttl;

  describe('Add resolution', () => {
    beforeEach(() => {
      sandbox.replace(patientService, 'getPatientId', () => currentId);
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('should add resolution to storage for new patient', async () => {
      sandbox.replace(resolutionService, 'findResolutionById', () => null);

      await resolutionService.addResolution(patient, resolution, ttl);
      expect(await patientService.getPatientId).to.be.ok;
      expect(await mysqlResolution.isResolutionExists).to.be.ok;

      sandbox.restore();
    });

    it('should add new text to existed resolution for existed patient', async () => {
      sandbox.replace(resolutionService, 'findResolutionById', () => resolution);
      sandbox.replace(mysqlResolution, 'getAllResolutions', () => [{ dataValues: { id: currentId, resolution } }]);

      await resolutionService.addResolution(patient, resolution, ttl);
      expect(await mysqlResolution.getAllResolutions).to.be.ok;

      sandbox.restore();
    });
  });

  describe('Find resolution', () => {
    const wrongName = 'Patient_999';

    it('should throw an error when there is no such patient', async () => {
      sandbox.replace(patientService, 'getPatientId', () => {
        throw new Error(`Patient ${wrongName} not found`);
      });

      try {
        await resolutionService.findResolution(wrongName);
      } catch (err) {
        expect(err.message).to.equal(`Patient ${wrongName} not found`);
      }

      sandbox.restore();
    });

    it('should return null when there is no such resolution', async () => {
      sandbox.replace(patientService, 'getPatientId', () => currentId);
      sandbox.replace(mysqlResolution, 'getAllResolutions', () => []);

      await resolutionService.addResolution(patient, resolution, ttl);
      expect(await resolutionService.findResolution(patient)).to.be.null;

      sandbox.restore();
    });
  });

  describe('TTL tests', () => {
    const date = Date.now();

    beforeEach(() => {
      sandbox.replace(patientService, 'getPatientId', () => currentId);
      sandbox.replace(mysqlResolution, 'getAllResolutions', () => [{ id: currentId, resolution, expire: new Date(date) }]);
    });
    afterEach(() => {
      sandbox.restore();
    });

    it('should return null when resolution is expired', async () => {
      sandbox.replace(global.Date, 'now', () => date + 5000);

      expect(await resolutionService.findResolution(patient)).to.be.null;

      sandbox.restore();
    });

    it('should return resolution when resolution is not expired', async () => {
      sandbox.replace(global.Date, 'now', () => date);

      expect(await resolutionService.findResolution(patient)).to.equal(resolution);

      sandbox.restore();
    });
  });

  describe('Delete resolution', () => {
    const wrongName = 'Patient_999';

    it('should throw an error when there is no such patient', async () => {
      sandbox.replace(patientService, 'getPatientId', () => {
        throw new Error(`Resolution for ${wrongName} not found`);
      });

      try {
        await resolutionService.deleteResolution(wrongName);
      } catch (err) {
        expect(err.message).to.equal(`Resolution for ${wrongName} not found`);
      }

      sandbox.restore();
    });

    it('should return null when patient is exists', async () => {
      sandbox.replace(patientService, 'getPatientId', () => currentId);
      sandbox.replace(resolutionService, 'findResolutionById', () => resolution);

      await resolutionService.deleteResolution(patient);
      expect(await mysqlResolution.removeResolution).to.be.ok;

      sandbox.restore();
    });
  });
});
