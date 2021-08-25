import chai, { expect } from 'chai';
import spies from 'chai-spies';
import redisMock from 'redis-mock';
import redis from 'redis';
import factory from '../../src/storage/StorageManager.js';
import ResolutionService from '../../src/resolution/resolution.service.js';
import PatientService from '../../src/patient/patient.service.js';
// import config from '../../config/config.js';

// const { type } = config;

chai.use(spies);

const sandbox = chai.spy.sandbox();

describe('Resolution tests', () => {
  const patientStorage = factory.createStorage('patient');
  const storage = factory.createStorage('resolution');
  const patientService = new PatientService(patientStorage);
  const resolutionService = new ResolutionService(storage, patientService);
  const patient = 'Patient_1';
  const resolution = 'resolution';
  let ttl;

  beforeEach(async () => {
    await storage.reset();
  });

  beforeEach(() => {
    sandbox.on(redis, 'createClient', () => redisMock.createClient);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('Add resolution', () => {
    it('should add resolution to storage for new patient', async () => {
      await resolutionService.addResolution(patient, resolution, ttl);
      expect(await storage.get())
        .to.be.an('array')
        .to.have.lengthOf(1);
    });

    it('should add new text to existed resolution for existed patient', async () => {
      await resolutionService.addResolution(patient, resolution, ttl);
      await resolutionService.addResolution(patient, resolution, ttl);
      expect(await storage.get())
        .to.be.an('array')
        .to.have.lengthOf(1);
    });
  });

  describe('Find resolution', () => {
    const wrongName = 'Patient_999';

    afterEach(() => {
      ttl = undefined;
    });

    it('should throw an error when there is no such patient', async () => {
      try {
        await resolutionService.findResolution(wrongName);
      } catch (err) {
        expect(err.message).to.equal(`Patient ${wrongName} not found`);
      }
    });

    it('should return resolution when TTL is not set', async () => {
      ttl = -1;
      await resolutionService.addResolution(patient, resolution, ttl);
      expect(await resolutionService.findResolution(patient)).to.equal(resolution);
    });
  });

  describe('TTL tests', () => {
    const date = Date.now(0);

    /**
     * хотела для типа redis сделать this.skip в before,
     * но не работает, поэтому пока весь тест skip
     */
    describe.skip('when resolution is expired', () => {
      beforeEach(async () => {
        ttl = 5; /* 5 seconds */
        /* если помещу  addResolution() в it то дата будет уже изменная и тест не отрабатывает */
        await resolutionService.addResolution(patient, resolution, ttl);
        sandbox.on(global.Date, 'now', () => date + (ttl + 5) * 1000);
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
        ttl = 5; /* 5 seconds */
        sandbox.on(global.Date, 'now', () => date);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should return resolution', async () => {
        await resolutionService.addResolution(patient, resolution, ttl);
        expect(await resolutionService.findResolution(patient)).to.equal(resolution);
      });
    });
  });

  describe('Delete resolution', () => {
    const wrongName = 'Patient_999';
    it('should throw an error when there is no such patient', async () => {
      try {
        await resolutionService.deleteResolution(wrongName);
      } catch (err) {
        expect(err.message).to.equal(`Resolution for ${wrongName} not found`);
      }
    });

    it('should return null when patient is exists', async () => {
      ttl = -1;
      await resolutionService.addResolution(patient, resolution, ttl);
      await resolutionService.deleteResolution(patient);
      expect(await resolutionService.findResolution(patient)).to.be.null;
    });
    afterEach(() => {
      ttl = undefined;
    });
  });
});
