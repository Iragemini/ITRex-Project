import queueService from './index.js';

export const getCurrent = async (req, res, next) => {
  const current = await queueService.getCurrentPatient();
  res.status(200).json({ current });
};

export const add = async (req, res, next) => {
  const { reason } = req.body;
  await queueService.addPatientToQueue({ userId: req.userId, reason });
  res.sendStatus(201);
};

export const remove = async (req, res, next) => {
  const nextInQueue = await queueService.nextPatient();
  res.status(200).json({ next: nextInQueue });
};
