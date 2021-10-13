import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { add, remove, getCurrent } from './queue.controllers.js';
import { setDoctorIdFromUserId } from '../doctor/doctor.controllers.js';
import verifyToken from '../middlewares/verifyToken.js';
import restrictTo from '../middlewares/restrictRoute.js';
import constants from '../utils/constants.js';

const queueRouter = Router();

// route for doctors, their doctorId is in JWT
queueRouter
  .route('/')
  .get(
    asyncHandler(verifyToken),
    restrictTo(constants.roles.doctor),
    setDoctorIdFromUserId,
    asyncHandler(getCurrent),
  )
  .delete(
    asyncHandler(verifyToken),
    restrictTo(constants.roles.doctor),
    setDoctorIdFromUserId,
    asyncHandler(remove),
  );

// route for patients, they need to specify the doctorId
queueRouter
  .route('/:doctorId')
  .post(
    asyncHandler(verifyToken),
    restrictTo(constants.roles.patient),
    asyncHandler(add),
  )
  .get(
    asyncHandler(verifyToken),
    restrictTo(constants.roles.patient),
    asyncHandler(getCurrent),
  );

export default queueRouter;
