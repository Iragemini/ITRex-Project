import { expect } from 'chai';
import storage from '../public/storage/storage.js';
import {
  addPatientToQueue,
  deletePatientFromQueue,
} from '../public/src/handlers.js';
const { queue } = storage;

describe('Queue handlers tests', () => {
  const data = [
    {
      patient: 'Ivan',
      expected: 'Ivan',
    },
    {
      patient: 'Vasia:ill',
      expected: 'Vasia',
    },
  ];

  before(() => {
    queue.length = 0;
  });

  describe('Add new patient to the queue', () => {
    it('should return name', () => {
      data.forEach((item) => {
        expect(addPatientToQueue(item.patient)).to.equal(item.expected);
      });
    });
    after(() => {
      queue.length = 0;
    });
  });

  describe('Add new patient to the queue', () => {
    before(() => {
      addPatientToQueue(data[1].patient);
    });
    it('should add {name, reason} object to array', () => {
      expect(queue[0]).to.have.property('name').with.lengthOf(5);
      expect(queue[0]).to.have.property('reason').with.lengthOf(3);
    });
  });

  describe('Delete patient from the queue', () => {
    before(() => {
      queue.length = 0;
    });
    it('If queue is empty should return "No patients in the queue" message', () => {
      const result = deletePatientFromQueue();
      expect(result).to.be.an('object').that.have.property('message');
      expect(result.message).to.equal('No patients in the queue');
    });
  });

  describe('Delete patient from the queue', () => {
    before(() => {
      data.forEach((item) => addPatientToQueue(item.patient));
    });
    it('should return next patient', () => {
      const result = deletePatientFromQueue();
      expect(result).to.be.an('object').that.have.property('next');
      expect(result.next).to.equal('Vasia');
    });
  });

  after(() => {
    queue.length = 0;
  });
});
