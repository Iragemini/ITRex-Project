import { expect } from 'chai';
import sinon from 'sinon';
import factory from '../../src/storage/factory.js';
import QueueService from '../../src/queue/queue.service.js';
import config from '../../config/config.js';
import createClient from './mocks/redis.mock.js';
import patientService from './mocks/patientService.mock.js';

const {
  storage: { queueType },
} = config;

const client = queueType === 'redis' ? createClient : [];

const queueStorage = factory.createStorage(client);
const queueService = new QueueService(queueStorage, patientService);

const sandbox = sinon.createSandbox();

describe('Queue tests', () => {
  const patient = 'Patient_1:reason';
  const [patientName, reason] = patient.split(':');
  const wrongName = 'Patient_999';
  const nextPatient = 'Patient_2';
  const currentId = 1;
  const nextId = 2;

  afterEach(() => {
    sandbox.restore();
  });

  describe('Add patient to the queue', () => {
    const userId = 1;
    const patientId = 5;

    it('should add id to the queue', async () => {
      sandbox.replace(patientService, 'getPatientIdByUserId', () => patientId);
      const spy = sandbox.spy(queueStorage, 'add');

      expect(await queueService.addPatientToQueue({ userId, reason })).to.be.undefined;
      expect(spy.withArgs(patientId, reason).calledOnce).to.be.true;
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

    it('should return next patient name when queue is not empty', async () => {
      sandbox.replace(queueStorage, 'getFirstKey', () => currentId);
      sandbox.replace(queueStorage, 'isEmpty', () => false);
      sandbox.replace(patientService, 'getPatientName', () => ({ name: patientName }));

      const spyGetFirstKey = sandbox.spy(queueStorage, 'getFirstKey');
      const spyIsEmpty = sandbox.spy(queueStorage, 'isEmpty');

      expect(await queueService.getCurrentPatient()).to.equal(patientName);
      expect(spyIsEmpty.called).to.be.true;
      expect(spyGetFirstKey.calledOnce).to.be.true;
      expect(spyGetFirstKey.returned(currentId));
      expect(spyIsEmpty.returned(false));
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
    });

    it('should throw an error when queue is empty', async () => {
      sandbox.replace(patientService, 'getPatientId', () => currentId);
      sandbox.replace(queueStorage, 'isEmpty', () => true);

      try {
        await queueService.nextPatient(patientName);
      } catch (err) {
        expect(err.message).to.equal('No patients in the queue');
      }
    });

    it('should return next patient name when queue is not empty', async () => {
      const spyRemove = sandbox.spy(queueStorage, 'remove');

      sandbox.replace(queueStorage, 'isEmpty', () => false);
      sandbox.replace(queueStorage, 'getFirstKey', () => nextId);
      sandbox.replace(patientService, 'getPatientName', () => nextPatient);

      const spyGetFirstKey = sandbox.spy(queueStorage, 'getFirstKey');

      expect(await queueService.nextPatient(patientName)).to.equal(nextPatient);
      expect(spyRemove.calledOnce).to.be.true;
      expect(spyGetFirstKey.calledOnce).to.be.true;
      expect(spyGetFirstKey.calledAfter(spyRemove));
    });
  });
});
