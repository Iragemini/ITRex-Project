import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  createResolution,
  getAllResolutions,
  getResolutionsByUserId,
  deleteResolutionById,
} from './resolution.controllers.js';
// import {
//   nameSchema,
//   resolutionSchema,
//   bodySchema,
// } from '../schemas/schemas.js';
// import { validator, checkTTL } from '../middlewares/validate.js';
import verifyToken from '../middlewares/verifyToken.js';
import restrictTo from '../middlewares/restrictRoute.js';

const router = Router();

router
  .route('/me')
  .get(
    asyncHandler(verifyToken),
    restrictTo('patient'),
    asyncHandler(getResolutionsByUserId),
  );

router
  .route('/')
  .post(
    asyncHandler(verifyToken),
    restrictTo('doctor'),
    asyncHandler(createResolution),
  )
  .get(
    asyncHandler(verifyToken),
    restrictTo('doctor'),
    asyncHandler(getAllResolutions),
  );

router
  .route('/:resolutionId')
  .delete(
    asyncHandler(verifyToken),
    restrictTo('doctor'),
    asyncHandler(deleteResolutionById),
  );

export default router;
