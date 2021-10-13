import queueService from './index.js';

export const add = async (req, res, next) => {
  await queueService.addPatientToQueue(req.user.id, req.params.doctorId);

  res.sendStatus(201);
};

export const getCurrent = async (req, res, next) => {
  const current = await queueService.getCurrentPatient(req.params.doctorId);

  res.status(200).json({ current });
};

export const remove = async (req, res, next) => {
  const nextInQueue = await queueService.nextPatient(req.params.doctorId);

  res.status(200).json({ next: nextInQueue });
};
