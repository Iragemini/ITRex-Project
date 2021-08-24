import QueueService from './queue.service.js';
import factory from '../storage/StorageManager.js';
import PatientService from '../patient/patient.service.js';

const patientStorage = factory.createStorage('patient');
const patientService = new PatientService(patientStorage);
const queueStorage = factory.createStorage('queue');
const queueService = new QueueService(queueStorage, patientService);

export const getCurrent = async (req, res, next) => {
  const current = await queueService.getCurrentPatient();
  res.status(200).json({ current });
};

export const add = async (req, res, next) => {
  const { patient } = req.body;
  const name = await queueService.addPatientToQueue(patient);
  res.status(201).json({ name });
};

export const remove = async (req, res, next) => {
  const { name } = req.params;
  const nextInQueue = await queueService.nextPatient(name);
  res.status(200).json({ next: nextInQueue });
};
