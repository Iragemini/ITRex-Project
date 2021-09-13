import queueService from './index.js';

export const add = async (req, res, next) => {
  await queueService.addPatientToQueue(req.user.id, req.params.doctorId);

  res.sendStatus(201);
};

export const getCurrent = async (req, res, next) => {
  const doctor = {};

  if (!req.params.doctorId && req.user['roles.title'] === 'doctor') {
    doctor.userId = req.user.id;
  } else {
    doctor.id = req.params.doctorId;
  }

  const current = await queueService.getCurrentPatient(doctor);

  res.status(200).json({ current });
};

export const remove = async (req, res, next) => {
  const nextInQueue = await queueService.nextPatient(req.user.id);

  res.status(200).json({ next: nextInQueue });
};
