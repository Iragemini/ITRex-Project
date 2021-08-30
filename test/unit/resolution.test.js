import { expect } from 'chai';
import sinon from 'sinon';
import patientService, { mysqlResolution, resolutionService } from './services.js';

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
    describe('', () => {
      beforeEach(() => {
        sandbox.replace(resolutionService, 'findResolutionById', () => null);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should add resolution to storage for new patient', async () => {
        await resolutionService.addResolution(patient, resolution, ttl);
        expect(await patientService.getPatientId).to.be.ok;
        expect(await mysqlResolution.isResolutionExists).to.be.ok;
      });
    });

    describe('', () => {
      beforeEach(() => {
        sandbox.replace(resolutionService, 'findResolutionById', () => resolution);
        sandbox.replace(mysqlResolution, 'getAllResolutions', () => [{ dataValues: { id: currentId, resolution } }]);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should add new text to existed resolution for existed patient', async () => {
        await resolutionService.addResolution(patient, resolution, ttl);
        expect(await mysqlResolution.getAllResolutions).to.be.ok;
      });
    });
  });

  describe('Find resolution', () => {
    const wrongName = 'Patient_999';

    describe('', () => {
      beforeEach(() => {
        sandbox.replace(patientService, 'getPatientId', () => {
          throw new Error(`Patient ${wrongName} not found`);
        });
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should throw an error when there is no such patient', async () => {
        try {
          await resolutionService.findResolution(wrongName);
        } catch (err) {
          expect(err.message).to.equal(`Patient ${wrongName} not found`);
        }
      });
    });

    describe('', () => {
      beforeEach(() => {
        sandbox.replace(patientService, 'getPatientId', () => currentId);
        sandbox.replace(mysqlResolution, 'getAllResolutions', () => []);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should return null when there is no such resolution', async () => {
        await resolutionService.addResolution(patient, resolution, ttl);
        expect(await resolutionService.findResolution(patient)).to.be.null;
      });
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

    describe('when resolution is expired', () => {
      beforeEach(async () => {
        sandbox.replace(global.Date, 'now', () => date + 5000);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should return null', async () => {
        expect(await resolutionService.findResolution(patient)).to.be.null;
      });
    });

    describe('when resolution is not expired', () => {
      beforeEach(() => {
        sandbox.replace(global.Date, 'now', () => date);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should return resolution', async () => {
        expect(await resolutionService.findResolution(patient)).to.equal(resolution);
      });
    });
  });

  describe('Delete resolution', () => {
    const wrongName = 'Patient_999';

    describe('', () => {
      beforeEach(() => {
        sandbox.replace(patientService, 'getPatientId', () => {
          throw new Error(`Resolution for ${wrongName} not found`);
        });
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should throw an error when there is no such patient', async () => {
        try {
          await resolutionService.deleteResolution(wrongName);
        } catch (err) {
          expect(err.message).to.equal(`Resolution for ${wrongName} not found`);
        }
      });
    });

    describe('', () => {
      beforeEach(() => {
        sandbox.replace(patientService, 'getPatientId', () => currentId);
        sandbox.replace(resolutionService, 'findResolutionById', () => resolution);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should return null when patient is exists', async () => {
        await resolutionService.deleteResolution(patient);
        expect(await mysqlResolution.removeResolution).to.be.ok;
      });
    });
  });
});