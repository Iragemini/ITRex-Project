import { expect } from 'chai';
import sinon from 'sinon';
import patientService, { queueStorage, queueService } from './services.js';

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
    beforeEach(() => {
      sandbox.replace(patientService, 'addPatient', () => id);
    });
    afterEach(() => {
      sandbox.restore();
    });
    it('should add id to the queue', async () => {
      await queueService.addPatientToQueue(patient);

      expect(await queueStorage.add).to.be.ok;
      expect(await patientService.addPatient).to.be.ok;
    });
  });

  describe('Get current patient', () => {
    describe('', () => {
      beforeEach(() => {
        sandbox.replace(queueStorage, 'isEmpty', () => true);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should throw an error when queue is empty', async () => {
        try {
          await queueService.getCurrentPatient();
        } catch (err) {
          expect(err.message).to.equal('No patients in the queue');
        }
      });
    });

    describe('', () => {
      beforeEach(() => {
        sandbox.replace(queueStorage, 'isEmpty', () => false);
        sandbox.replace(queueStorage, 'getFirstKey', () => currentId);
        sandbox.replace(patientService, 'getPatientName', () => patientName);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should return next patient name when queue is not empty', async () => {
        expect(await queueService.getCurrentPatient()).to.equal(patientName);
      });
    });
  });

  describe('Get next patient', () => {
    describe('', () => {
      beforeEach(() => {
        sandbox.replace(queueStorage, 'getFirstKey', () => null);
        sandbox.replace(patientService, 'getPatientId', () => {
          throw new Error(`Patient ${wrongName} not found`);
        });
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should throw an error when patient is not in the queue', async () => {
        try {
          await queueService.nextPatient(wrongName);
        } catch (err) {
          expect(err.message).to.equal(`Patient ${wrongName} not found`);
        }
      });
    });

    describe('', () => {
      beforeEach(() => {
        sandbox.replace(patientService, 'getPatientId', () => currentId);
        sandbox.replace(queueStorage, 'isEmpty', () => true);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should throw an error when queue is empty', async () => {
        try {
          await queueService.nextPatient(patientName);
        } catch (err) {
          expect(err.message).to.equal('No patients in the queue');
        }
      });
    });

    describe('', () => {
      beforeEach(() => {
        sandbox.replace(patientService, 'getPatientId', () => currentId);
        sandbox.replace(queueStorage, 'isEmpty', () => false);
        sandbox.replace(queueStorage, 'getFirstKey', () => nextId);
        sandbox.replace(patientService, 'getPatientName', () => nextPatient);
      });
      afterEach(() => {
        sandbox.restore();
      });
      it('should return next patient name when queue is not empty', async () => {
        expect(await queueService.nextPatient(patientName)).to.equal(nextPatient);
      });
    });
  });
});
