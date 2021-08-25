import chai, { expect } from 'chai';
import spies from 'chai-spies';
import redisMock from 'redis-mock';
import redis from 'redis';
import factory from '../../src/storage/StorageManager.js';
import QueueService from '../../src/queue/queue.service.js';
import PatientService from '../../src/patient/patient.service.js';

chai.use(spies);

describe('Queue tests', () => {
  const patientStorage = factory.createStorage('patient');
  const queueStorage = factory.createStorage('queue');
  const patientService = new PatientService(patientStorage);
  const queueService = new QueueService(queueStorage, patientService);
  const patient = 'Patient_1:reason';
  const patientName = patient.split(':')[0];

  beforeEach(async () => {
    await queueStorage.reset();
    await patientStorage.reset();
  });

  beforeEach(() => {
    chai.spy.on(redis, 'createClient', () => redisMock.createClient);
  });

  afterEach(() => {
    chai.spy.restore(redis, 'createClient');
  });

  describe('Add new patient to the queue', () => {
    it('should return patient name', async () => {
      expect(await queueService.addPatientToQueue(patient)).to.equal(patientName);
    });
  });

  /**
   * пока не разобралась как сделать через expect(() => fn).to.throw(Error)
   */
  describe('Get current patient', () => {
    it('should throw an error when queue is empty', async () => {
      try {
        await queueService.getCurrentPatient();
      } catch (err) {
        expect(err.message).to.equal('No patients in the queue');
      }
    });
    it('should return next patient name when queue is not empty', async () => {
      await queueService.addPatientToQueue(patient);
      expect(await queueService.getCurrentPatient()).to.equal(patientName);
    });
  });

  describe('Get next patient', () => {
    const wrongName = 'Patient_999';
    const nextPatient = 'Patient_2';

    it('should throw an error when patient is not in the queue', async () => {
      try {
        await queueService.addPatientToQueue(patient);
        await queueService.nextPatient(wrongName);
      } catch (err) {
        expect(err.message).to.equal(`Patient ${wrongName} not found`);
      }
    });

    it('should throw an error when queue is empty', async () => {
      try {
        await queueService.addPatientToQueue(patient);
        await queueService.nextPatient(patientName);
      } catch (err) {
        expect(err.message).to.equal('No patients in the queue');
      }
    });

    it('should return next patient name when queue is not empty', async () => {
      await queueService.addPatientToQueue(patient);
      await queueService.addPatientToQueue(nextPatient);
      expect(await queueService.nextPatient(patientName)).to.equal(nextPatient);
    });
  });
});
