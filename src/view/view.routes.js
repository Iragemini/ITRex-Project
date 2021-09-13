import express from 'express';
import asyncHandler from 'express-async-handler';
import viewController from './view.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', viewController.isLoggedIn, viewController.getDoctorList);

router.get('/doctor-signin', viewController.isLoggedIn, viewController.getDoctorSigninForm);
router.get('/signin', viewController.isLoggedIn, viewController.getSigninForm);
router.get('/signup', viewController.isLoggedIn, viewController.getSignupForm);

router.get(
  '/doctor-:doctorId',
  viewController.isLoggedIn,
  viewController.getQueue,
);

router.get(
  '/process',
  viewController.isLoggedIn,
  viewController.processPatient,
);

router.get(
  '/personal-resolutions',
  viewController.isLoggedIn,
  asyncHandler(verifyToken),
  viewController.getPersonalResolutions,
);

router.get(
  '/resolutions',
  viewController.isLoggedIn,
  asyncHandler(verifyToken),
  viewController.getAllResolutionsByName,
);

export default router;
