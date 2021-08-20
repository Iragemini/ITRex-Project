import ApiError from '../errors/ApiError.js';
import service from '../service/service.js';

const queueService = service('queue');

export const getCurrent = async (req, res, next) => {
  try {
    const current = await queueService.getCurrentPatient();
    res.status(200).json({ current });
  } catch (err) {
    next(err);
  }
};

export const add = async (req, res, next) => {
  const { patient } = req.body;
  if (!patient) {
    return next(new ApiError(400, 'empty parameters'));
  }
  try {
    const name = await queueService.addPatientToQueue(patient);
    res.status(201).json({ name });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  const { name } = req.params;
  try {
    const nextInQueue = await queueService.nextPatient(name);
    res.status(200).json({ next: nextInQueue });
  } catch (err) {
    next(err);
  }
};
