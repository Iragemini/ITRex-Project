import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getAllDoctors,
  getDoctorById,
  setDoctorIdFromUserId,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from './doctor.controllers.js';
import verifyToken from '../middlewares/verifyToken.js';
import restrictTo from '../middlewares/restrictRoute.js';
import constants from '../utils/constants.js';

const router = Router();

router.use(asyncHandler(verifyToken));

router.get('/me', setDoctorIdFromUserId, asyncHandler(getDoctorById));

router.get('/:doctorId', asyncHandler(getDoctorById));

router
  .route('/')
  .get(asyncHandler(getAllDoctors))
  .post(restrictTo(constants.roles.admin), asyncHandler(createDoctor));

router
  .route('/:doctorId')
  .all(restrictTo(constants.roles.admin))
  .patch(asyncHandler(updateDoctor))
  .delete(asyncHandler(deleteDoctor));

export default router;
