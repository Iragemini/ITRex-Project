import chai, { expect } from 'chai';
import spies from 'chai-spies';
import redisMock from 'redis-mock';
import redis from 'redis';
import factory from '../../src/storage/StorageManager.js';
import ResolutionService from '../../src/resolution/resolution.service.js';
// import config from '../../config/config.js';

// const { type } = config;

chai.use(spies);

describe('Resolution tests', () => {
  before(() => {
    chai.spy.on(redis, 'createClient', () => redisMock.createClient);
  });
  const storage = factory.createStorage('resolution');
  const resolutionService = new ResolutionService(storage);
  const patient = 'Patient_1';
  const resolution = 'resolution';
  let ttl;

  beforeEach(async () => {
    await storage.reset();
  });

  describe('Add resolution', () => {
    describe('for new patient', () => {
      it('should add resolution to storage', async () => {
        await resolutionService.addResolution(patient, resolution, ttl);
        expect(await storage.get())
          .to.be.an('array')
          .to.have.lengthOf(1);
      });
    });

    describe('for existed patient', () => {
      it('should add new text to existed resolution', async () => {
        await resolutionService.addResolution(patient, resolution, ttl);
        await resolutionService.addResolution(patient, resolution, ttl);
        expect(await storage.get())
          .to.be.an('array')
          .to.have.lengthOf(1);
      });
    });
  });

  describe('Find resolution', () => {
    describe('when there is no such patient', () => {
      it('should throw an error', async () => {
        const wrongName = 'Patient_999';
        try {
          await resolutionService.findResolution(wrongName);
        } catch (err) {
          expect(err.message).to.equal(`Patient ${wrongName} not found`);
        }
      });
    });

    describe('when patient is exists', () => {
      describe('when TTL is not set', () => {
        beforeEach(async () => {
          ttl = -1;
          await resolutionService.addResolution(patient, resolution, ttl);
        });
        it('should return resolution', async () => {
          expect(await resolutionService.findResolution(patient)).to.equal(resolution);
        });
      });

      /**
       * хотела для типа redis сделать this.skip в before,
       * но не работает, поэтому пока весь тест skip
       */
      describe.skip('when TTL is set', () => {
        beforeEach(async () => {
          ttl = 5; /* 5 seconds */
          await resolutionService.addResolution(patient, resolution, ttl);
        });
        describe('when is expired', () => {
          beforeEach(() => {
            const date = Date.now();
            chai.spy.on(global.Date, 'now', () => date + ttl * 1001);
          });
          it('should return null', async () => {
            expect(await resolutionService.findResolution(patient)).to.be.null;
          });
        });

        describe('when is not expired', () => {
          beforeEach(() => {
            const date = Date.now();
            chai.spy.on(global.Date, 'now', () => date);
          });
          it('should return resolution', async () => {
            expect(await resolutionService.findResolution(patient)).to.equal(resolution);
          });
        });
      });
    });
    afterEach(() => {
      ttl = undefined;
      chai.spy.restore(global.Date, 'now');
    });
  });

  describe('Delete resolution', () => {
    describe('when there is no such patient', () => {
      it('should throw an error', async () => {
        const wrongName = 'Patient_999';
        try {
          await resolutionService.deleteResolution(wrongName);
        } catch (err) {
          expect(err.message).to.equal(`Resolution for ${wrongName} not found`);
        }
      });
    });

    describe('when patient is exists', () => {
      beforeEach(async () => {
        ttl = -1;
        await resolutionService.addResolution(patient, resolution, ttl);
      });
      it('should return null', async () => {
        await resolutionService.deleteResolution(patient);
        expect(await resolutionService.findResolution(patient)).to.be.null;
      });
    });
  });

  after(() => {
    chai.spy.restore(redis, 'createClient');
  });
});
