import constants from '../utils/constants.js';
import doctorService from './index.js';
import userService from '../user/index.js';

export const setDoctorIdFromUserId = async (req, res, next) => {
  if (!req.params.doctorId && req.user.roleTitle === constants.roles.doctor) {
    const doctor = await doctorService.getDoctorByUserId(req.user.id);
    req.params.doctorId = doctor.id;
  }
  next();
};

export const getAllDoctors = async (req, res, next) => {
  const doctors = await doctorService.getAllDoctors();

  res.status(200).json({
    data: doctors,
  });
};

export const getDoctorById = async (req, res, next) => {
  const doctor = await doctorService.getDoctorById(req.params.doctorId);

  res.status(200).json({
    data: doctor,
  });
};

export const createDoctor = async (req, res, next) => {
  await userService.createUser({ ...req.body, role: constants.roles.doctor });

  res.sendStatus(201);
};

export const updateDoctor = async (req, res, next) => {
  const doctor = await doctorService.updateDoctor({ ...req.body, id: req.params.doctorId });

  res.status(200).json({ data: doctor });
};

export const deleteDoctor = async (req, res, next) => {
  await doctorService.deleteDoctor(req.params.doctorId);

  res.sendStatus(204);
};
