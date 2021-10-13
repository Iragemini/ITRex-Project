import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  getAllDoctors,
  getDoctorById,
  setDoctorIdFromUserId,
} from './doctor.controllers.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router
  .route('/')
  .get(
    asyncHandler(getAllDoctors),
  );

router
  .route('/me')
  .get(
    asyncHandler(verifyToken),
    setDoctorIdFromUserId,
    asyncHandler(getDoctorById),
  );

router
  .route('/:doctorId')
  .get(
    asyncHandler(getDoctorById),
  );

export default router;
