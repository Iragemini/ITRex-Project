import { expect } from 'chai';
import sinon from 'sinon';
import patientService from '../../src/patient/index.js';
import factory from '../../src/storage/factory.js';
import QueueService from '../../src/queue/queue.service.js';
import config from '../../config/config.js';
import createClient from './mocks/redis.mock.js';

const {
  storage: { queueType },
} = config;

const client = queueType === 'redis' ? createClient : [];

const queueStorage = factory.createStorage(client);
const queueService = new QueueService(queueStorage, patientService);

const sandbox = sinon.createSandbox();

describe('Queue tests', () => {
  const patient = 'Patient_1:reason';
  const patientName = patient.split(':')[0];
  const wrongName = 'Patient_999';
  const nextPatient = 'Patient_2';
  const currentId = 1;
  const nextId = 2;

  describe('Add patient to the queue', () => {
    const id = 1;

    it('should add id to the queue', async () => {
      sandbox.replace(patientService, 'addPatient', () => id);

      await queueService.addPatientToQueue(patient);
      expect(await queueStorage.add).to.be.ok;
      expect(await patientService.addPatient).to.be.ok;

      sandbox.restore();
    });
  });

  describe('Get current patient', () => {
    it('should throw an error when queue is empty', async () => {
      sandbox.replace(queueStorage, 'isEmpty', () => true);

      try {
        await queueService.getCurrentPatient();
      } catch (err) {
        expect(err.message).to.equal('No patients in the queue');
      }

      sandbox.restore();
    });

    it('should return next patient name when queue is not empty', async () => {
      sandbox.replace(queueStorage, 'isEmpty', () => false);
      sandbox.replace(queueStorage, 'getFirstKey', () => currentId);
      sandbox.replace(patientService, 'getPatientName', () => patientName);

      expect(await queueService.getCurrentPatient()).to.equal(patientName);

      sandbox.restore();
    });
  });

  describe('Get next patient', () => {
    it('should throw an error when patient is not in the queue', async () => {
      sandbox.replace(queueStorage, 'getFirstKey', () => null);
      sandbox.replace(patientService, 'getPatientId', () => {
        throw new Error(`Patient ${wrongName} not found`);
      });

      try {
        await queueService.nextPatient(wrongName);
      } catch (err) {
        expect(err.message).to.equal(`Patient ${wrongName} not found`);
      }

      sandbox.restore();
    });

    it('should throw an error when queue is empty', async () => {
      sandbox.replace(patientService, 'getPatientId', () => currentId);
      sandbox.replace(queueStorage, 'isEmpty', () => true);

      try {
        await queueService.nextPatient(patientName);
      } catch (err) {
        expect(err.message).to.equal('No patients in the queue');
      }

      sandbox.restore();
    });

    it('should return next patient name when queue is not empty', async () => {
      sandbox.replace(patientService, 'getPatientId', () => currentId);
      sandbox.replace(queueStorage, 'isEmpty', () => false);
      sandbox.replace(queueStorage, 'getFirstKey', () => nextId);
      sandbox.replace(patientService, 'getPatientName', () => nextPatient);

      expect(await queueService.nextPatient(patientName)).to.equal(nextPatient);

      sandbox.restore();
    });
  });
});
