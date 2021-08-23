import { expect } from 'chai';
import QueueService from '../../src/queue/queue.service.js';
import factory from '../../src/storage/StorageManager.js';

describe('Queue tests', () => {
  const storage = factory.createStorage('queue');
  const queueService = new QueueService(storage);
  const patient = 'Patient_1:reason';

  beforeEach(async () => {
    await storage.reset();
  });

  describe('Add new patient to the queue', () => {
    it('should return patient name', async () => {
      expect(await queueService.addPatientToQueue(patient)).to.equal('Patient_1');
    });
  });

  /**
   * пока не разобралась как сделать через expect(() => fn).to.throw(Error)
   */
  describe('Get current patient', () => {
    describe(' when queue is empty ', () => {
      it('should throw an error', async () => {
        try {
          await queueService.getCurrentPatient();
        } catch (err) {
          expect(err.message).to.equal('No patients in the queue');
        }
      });
    });

    describe(' when queue is not empty ', () => {
      beforeEach(async () => {
        await queueService.addPatientToQueue(patient);
      });
      it('should return next patient name', async () => {
        expect(await queueService.getCurrentPatient()).to.equal('Patient_1');
      });
    });
  });

  describe('Get next patient', () => {
    beforeEach(async () => {
      await queueService.addPatientToQueue(patient);
    });
    describe('when patient not in the queue', () => {
      it('should throw an error', async () => {
        const wrongName = 'Patient_999';
        try {
          await queueService.nextPatient(wrongName);
        } catch (err) {
          expect(err.message).to.equal(`Patient ${wrongName} not found`);
        }
      });
    });

    describe('when queue is empty', () => {
      it('should throw an error', async () => {
        try {
          await queueService.nextPatient('Patient_1');
        } catch (err) {
          expect(err.message).to.equal('No patients in the queue');
        }
      });
    });

    describe('when queue is not empty', () => {
      const nextPatient = 'Patient_2';
      beforeEach(async () => {
        await queueService.addPatientToQueue(nextPatient);
      });
      it('should return next patient name', async () => {
        expect(await queueService.nextPatient('Patient_1')).to.equal(nextPatient);
      });
    });
  });
});
