import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';
import userService from '../user/index.js';
import doctorService from '../doctor/index.js';
import queueService from '../queue/index.js';
import resolutionService from '../resolution/index.js';

const {
  auth: { SECRET },
} = config;

// only for rendered pages
const isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(req.cookies.jwt, SECRET);

      const currentUser = await userService.getUserById(decoded.id);

      if (!currentUser) {
        return next();
      }

      // don't send sensitive data
      currentUser.password = undefined;
      currentUser.passwordConfirm = undefined;
      currentUser.passwordChangedAt = undefined;

      // put the user data into the request for the next controllers
      req.user = currentUser;
      res.locals.user = currentUser;

      return next();
    }
  } catch (error) {
    // console.log(error);
    return next();
  }
  next();
};

const getDoctorList = async (req, res, next) => {
  const doctors = await doctorService.getAllDoctors();

  res.status(200).render('doctorSelect', {
    title: 'Doctors',
    doctors,
  });
};

const getQueue = async (req, res, next) => {
  const queue = {};

  try {
    const currentPatient = await queueService.getCurrentPatient({ id: req.params.doctorId });
    queue.current = currentPatient.name;
  } catch (error) {
    queue.current = undefined;
  }

  const doctor = await doctorService.getDoctorById(req.params.doctorId);

  res.status(200).render('queue', {
    title: 'Queue',
    queue,
    doctor,
  });
};

const processPatient = async (req, res, next) => {
  const doctor = await doctorService.getDoctorByUserId(req.user.id);
  const currentPatient = await queueService.getCurrentPatient({ id: doctor.id });

  const queue = {};

  if (currentPatient) {
    queue.current = currentPatient.name;
  }

  res.status(200).render('process', {
    title: 'Process patients',
    queue,
    doctor,
  });
};

const getPersonalResolutions = async (req, res, next) => {
  let resolutions;

  try {
    resolutions = await resolutionService.getResolutionsByUserId(req.user.id);
  } catch (error) {
    resolutions = undefined;
  }

  res.status(200).render('personalResolutions', {
    title: 'Resolutions',
    resolutions,
  });
};

const getAllResolutionsByName = async (req, res, next) => {
  let resolutions;

  try {
    resolutions = await resolutionService.getAllResolutions(req.query);
  } catch (error) {
    resolutions = undefined;
  }

  res.status(200).render('resolutions', {
    title: 'Resolutions',
    resolutions,
  });
};

const getSigninForm = (req, res) => {
  res.status(200).render('signin', {
    title: 'Sign in as patient',
  });
};

const getDoctorSigninForm = (req, res) => {
  res.status(200).render('doctorSignin', {
    title: 'Sign in as doctor',
  });
};

const getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account',
  });
};

export default {
  isLoggedIn,
  getDoctorList,
  getSigninForm,
  getDoctorSigninForm,
  getSignupForm,
  getQueue,
  processPatient,
  getPersonalResolutions,
  getAllResolutionsByName,
};
