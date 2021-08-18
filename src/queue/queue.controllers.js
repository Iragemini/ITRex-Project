import ApiError from '../errors/ApiError.js';
import { Service } from '../service/Service.js';
const serviceInstance = new Service('queue');
const service = serviceInstance.createService();

export const getCurrent = async (req, res, next) => {
  try {
    const current = await service.getCurrentPatient();
    res.status(200).json({ current });
  } catch (err) {
    next(err);
  }
};

export const add = async (req, res, next) => {
  const patient = req.body.patient;
  if (!patient) {
    return next(new ApiError(400, 'empty parameters'));
  }
  try {
    const name = await service.addPatientToQueue(patient);
    res.status(201).json({ name });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  const name = req.params.name;
  try {
    const nextInQueue = await service.nextPatient(name);
    res.status(200).json({ next: nextInQueue });
  } catch (err) {
    next(err);
  }
};
