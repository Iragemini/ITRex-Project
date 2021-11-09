import { expect } from 'chai';
import sinon from 'sinon';
import QueueService from '../../src/queue/queue.service.js';
import config from '../../config/config.js';
import createClient from './mocks/redis.mock.js';
import patientService from './mocks/patientService.mock.js';
import doctorService from './mocks/doctorService.mock.js';
import RedisQueue from '../../src/storage/redis/queue.storage.js';

const {
  storage: { queueType },
} = config;

const client = queueType === 'redis' ? createClient : [];

const queueStorage = new RedisQueue(client);
const queueService = new QueueService(queueStorage, patientService, doctorService);

const sandbox = sinon.createSandbox();

describe('Queue tests', () => {
  const id = 4;
  const name = 'Patient_1';
  const email = 'email@email.com';
  const gender = 'male';
  const birthDate = new Date();
  const userId = 4;
  const patient = {
    id,
    name,
    email,
    gender,
    birthDate,
    userId,
  };

  const doctorId = 1;

  afterEach(() => {
    sandbox.restore();
  });

  describe('Add patient to the queue', () => {
    it('should add patientId to the queue', async () => {
      sandbox.replace(doctorService, 'getDoctorById', () => undefined);
      sandbox.replace(patientService, 'getPatientByUserId', () => patient);

      const spy = sandbox.spy(queueStorage, 'add');

      expect(await queueService.addPatientToQueue(userId, doctorId)).to.be.undefined;
      expect(spy.withArgs(patient.id, doctorId).calledOnce).to.be.true;
      expect(spy.returned(undefined));
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
    });

    it('should return next patient when queue is not empty', async () => {
      sandbox.replace(queueStorage, 'getFirstKey', () => id);
      sandbox.replace(patientService, 'getPatientById', () => patient);

      const spyGetFirstKey = sandbox.spy(queueStorage, 'getFirstKey');

      expect(await queueService.getCurrentPatient(doctorId)).to.equal(patient);
      expect(spyGetFirstKey.calledOnce).to.be.true;
      expect(spyGetFirstKey.returned(id));
    });
  });

  describe('Get next patient', () => {
    it('should throw an error when queue is empty', async () => {
      sandbox.replace(queueStorage, 'remove', () => undefined);
      sandbox.replace(queueStorage, 'isEmpty', () => true);

      try {
        await queueService.nextPatient(doctorId);
      } catch (err) {
        expect(err.message).to.equal('No patients in the queue');
      }
    });

    it('should return next patient name when queue is not empty', async () => {
      const spyRemove = sandbox.spy(queueStorage, 'remove');

      sandbox.replace(queueStorage, 'isEmpty', () => false);
      sandbox.replace(queueStorage, 'getFirstKey', () => id);
      sandbox.replace(patientService, 'getPatientById', () => patient);

      const spyGetFirstKey = sandbox.spy(queueStorage, 'getFirstKey');

      expect(await queueService.nextPatient(doctorId)).to.equal(patient);
      expect(spyRemove.calledOnce).to.be.true;
      expect(spyGetFirstKey.calledOnce).to.be.true;
      expect(spyGetFirstKey.calledAfter(spyRemove));
    });
  });
});
