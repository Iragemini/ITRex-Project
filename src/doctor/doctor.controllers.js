import constants from '../utils/constants.js';
import doctorService from './index.js';

export const setDoctorIdFromUserId = async (req, res, next) => {
  if (!req.params.doctorId && req.user['roles.title'] === constants.roles.doctor) {
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
