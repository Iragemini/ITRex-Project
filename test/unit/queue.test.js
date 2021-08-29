import chai, { expect } from 'chai';
import spies from 'chai-spies';
import patientService, { queueStorage, queueService } from './services.js';

chai.use(spies);
const sandbox = chai.spy.sandbox();

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
      sandbox.on(patientService, 'addPatient', () => id);
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
        sandbox.on(queueStorage, 'isEmpty', () => true);
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
        sandbox.on(queueStorage, 'isEmpty', () => false);
        sandbox.on(queueStorage, 'getFirstKey', () => currentId);
        sandbox.on(patientService, 'getPatientName', () => patientName);
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
        sandbox.on(queueStorage, 'getFirstKey', () => null);
        sandbox.on(patientService, 'getPatientId', () => {
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
        sandbox.on(patientService, 'getPatientId', () => currentId);
        sandbox.on(queueStorage, 'isEmpty', () => true);
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
        sandbox.on(patientService, 'getPatientId', () => currentId);
        sandbox.on(queueStorage, 'isEmpty', () => false);
        sandbox.on(queueStorage, 'getFirstKey', () => nextId);
        sandbox.on(patientService, 'getPatientName', () => nextPatient);
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
