import queueService from './index.js';
import doctorService from '../doctor/index.js';
import ApiError from '../errors/ApiError.js';

export const add = async (req, res, next) => {
  const doctor = await doctorService.getDoctorByUserId(req.params.doctorId);

  if (!doctor) { return next(new ApiError(404, 'Doctor not found')); }

  await queueService.addPatientToQueue(req.user.id, req.params.doctorId);

  res.sendStatus(201);
};

export const getCurrent = async (req, res, next) => {
  if (!req.params.doctorId) {
    const doctor = await doctorService.getDoctorByUserId(req.user.id);
    req.params.doctorId = doctor.id;
  }

  const current = await queueService.getCurrentPatient(req.params.doctorId);

  res.status(200).json({ current });
};

export const remove = async (req, res, next) => {
  const doctor = await doctorService.getDoctorByUserId(req.user.id);

  // sending data on delete :thinking:
  const nextInQueue = await queueService.nextPatient(doctor.id);

  res.status(200).json({ next: nextInQueue });
};
