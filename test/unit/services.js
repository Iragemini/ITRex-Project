import factory from '../../src/storage/factory.js';
import QueueService from '../../src/queue/queue.service.js';
import PatientService from '../../src/patient/patient.service.js';
import ResolutionService from '../../src/resolution/resolution.service.js';

export const patientStorage = factory.createStorage('patient');
export const patientService = new PatientService(patientStorage);

export const queueStorage = factory.createStorage('queue');
export const queueService = new QueueService(queueStorage, patientService);

export const storage = factory.createStorage('resolution');
export const resolutionService = new ResolutionService(storage, patientService);
