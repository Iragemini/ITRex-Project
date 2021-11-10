import constants from '../utils/constants.js';
import doctorService from './index.js';
import userService from '../user/index.js';
import redisCache from '../storage/redis/cache.js';
import config from '../../config/config.js';

const {
  storage: {
    redis: { cacheTTL },
  },
} = config;

export const setDoctorIdFromUserId = async (req, res, next) => {
  if (!req.params.doctorId && req.user.roleTitle === constants.roles.doctor) {
    const doctor = await doctorService.getDoctorByUserId(req.user.id);
    req.params.doctorId = doctor.id;
  }
  next();
};

export const getAllDoctors = async (req, res, next) => {
  let doctors = await redisCache.get(constants.doctorCache.allDoctors);
  let metaData = 'from cache';

  if (!doctors) {
    doctors = await doctorService.getAllDoctors();
    await redisCache.set(constants.doctorCache.allDoctors, doctors, cacheTTL);
    metaData = 'from server';
  }

  res.status(200).json({
    metaData,
    data: doctors,
  });
};

export const getDoctorById = async (req, res, next) => {
  const { doctorId } = req.params;

  let doctor = await redisCache.get(`${constants.doctorCache.prefix}:${doctorId}`);
  let metaData = 'from cache';

  if (!doctor) {
    doctor = await doctorService.getDoctorById(doctorId);
    await redisCache.set(`${constants.doctorCache.prefix}:${doctorId}`, doctor, cacheTTL);
    metaData = 'from server';
  }

  res.status(200).json({
    metaData,
    data: doctor,
  });
};

export const createDoctor = async (req, res, next) => {
  await userService.createUser({ ...req.body, role: constants.roles.doctor });

  await redisCache.delete(constants.doctorCache.allDoctors);

  res.sendStatus(201);
};

export const updateDoctor = async (req, res, next) => {
  const { doctorId } = req.params;

  const doctor = await doctorService.updateDoctor({ ...req.body, id: doctorId });

  await redisCache.delete(`${constants.doctorCache.prefix}:${doctorId}`);
  await redisCache.delete(constants.doctorCache.allDoctors);

  res.status(200).json({ data: doctor });
};

export const deleteDoctor = async (req, res, next) => {
  const { doctorId } = req.params;

  await doctorService.deleteDoctor(doctorId);

  await redisCache.delete(`${constants.doctorCache.prefix}:${doctorId}`);
  await redisCache.delete(constants.doctorCache.allDoctors);

  res.sendStatus(204);
};
