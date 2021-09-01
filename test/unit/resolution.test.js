import { expect } from 'chai';
import sinon from 'sinon';
import patientService from './mocks/patientService.mock.js';
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

    it('should add resolution when is not exists', async () => {
      sandbox.replace(resolutionService, 'findResolutionById', () => null);
      const spyAdd = sandbox.spy(mysqlResolution, 'add');
      const spyFindResolutionById = sandbox.spy(resolutionService, 'findResolutionById');

      await resolutionService.addResolution(patient, resolution, ttl);
      expect(spyAdd.withArgs(currentId, { resolution, ttl: -1 }).calledOnce).to.be.true;
      expect(spyFindResolutionById.returned(null)).to.be.true;
    });

    it('should add new text to existed resolution', async () => {
      sandbox.replace(resolutionService, 'findResolutionById', () => resolution);
      sandbox.replace(mysqlResolution, 'getOneResolution', () => ({ id: currentId, resolution }));

      const spyUpdate = sandbox.spy(mysqlResolution, 'update');
      const spyFindResolutionById = sandbox.spy(resolutionService, 'findResolutionById');
      const spyGetPatientId = sandbox.spy(patientService, 'getPatientId');

      await resolutionService.addResolution(patient, resolution, ttl);
      expect(spyUpdate.withArgs(currentId, resolution, -1).calledOnce).to.be.true;
      expect(spyFindResolutionById.returned(resolution)).to.be.true;
      expect(spyGetPatientId.calledBefore(spyFindResolutionById)).to.be.true;
    });
  });

  describe('Find resolution', () => {
    const wrongName = 'Patient_999';

    afterEach(() => {
      sandbox.restore();
    });

    it('should throw an error when there is no such patient', async () => {
      sandbox.replace(patientService, 'getPatientId', () => {
        throw new Error(`Patient ${wrongName} not found`);
      });

      try {
        await resolutionService.findResolution(wrongName);
      } catch (err) {
        expect(err.message).to.equal(`Patient ${wrongName} not found`);
      }
    });

    it('should return null when there is no such resolution', async () => {
      sandbox.replace(patientService, 'getPatientId', () => currentId);
      sandbox.replace(mysqlResolution, 'getOneResolution', () => null);

      const spyGetResolution = sandbox.spy(mysqlResolution, 'getResolution');
      const spyGetOneResolution = sandbox.spy(mysqlResolution, 'getOneResolution');
      const spyGetPatientId = sandbox.spy(patientService, 'getPatientId');

      expect(await resolutionService.findResolution(patient)).to.be.null;
      expect(spyGetResolution.withArgs(currentId).calledOnce).to.be.true;
      expect(spyGetOneResolution.withArgs(currentId).calledOnce).to.be.true;
      expect(spyGetPatientId.returned(currentId)).to.be.true;
      expect(spyGetPatientId.calledBefore(spyGetResolution)).to.be.true;
      expect(spyGetOneResolution.returned(null)).to.be.true;
    });
  });

  describe('TTL tests', () => {
    const date = Date.now();

    beforeEach(() => {
      sandbox.replace(patientService, 'getPatientId', () => currentId);
      sandbox.replace(mysqlResolution, 'getOneResolution', () => ({ id: currentId, resolution, expire: new Date(date) }));
    });
    afterEach(() => {
      sandbox.restore();
    });

    it('should return null when resolution is expired', async () => {
      sandbox.replace(global.Date, 'now', () => date + 5000);

      expect(await resolutionService.findResolution(patient)).to.be.null;
    });

    it('should return resolution when resolution is not expired', async () => {
      sandbox.replace(global.Date, 'now', () => date);

      expect(await resolutionService.findResolution(patient)).to.equal(resolution);
    });
  });

  describe('Delete resolution', () => {
    const wrongName = 'Patient_999';

    afterEach(() => {
      sandbox.restore();
    });

    it('should throw an error when there is no such patient', async () => {
      sandbox.replace(patientService, 'getPatientId', () => {
        throw new Error(`Resolution for ${wrongName} not found`);
      });

      try {
        await resolutionService.deleteResolution(wrongName);
      } catch (err) {
        expect(err.message).to.equal(`Resolution for ${wrongName} not found`);
      }
    });

    it('should delete resolution', async () => {
      sandbox.replace(patientService, 'getPatientId', () => currentId);
      sandbox.replace(resolutionService, 'findResolutionById', () => resolution);

      const spyRemoveResolution = sandbox.spy(mysqlResolution, 'removeResolution');
      const spyGetPatientId = sandbox.spy(patientService, 'getPatientId');
      const spyFindResolutionById = sandbox.spy(resolutionService, 'findResolutionById');

      await resolutionService.deleteResolution(patient);
      expect(spyRemoveResolution.withArgs(currentId).calledOnce).to.be.true;
      expect(spyGetPatientId.calledBefore(spyFindResolutionById)).to.be.true;
      expect(spyGetPatientId.returned(currentId)).to.be.true;
      expect(spyFindResolutionById.returned(resolution)).to.be.true;
    });
  });
});
