import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  add,
  findAll,
  findAllByUserId,
  remove,
} from './resolution.controllers.js';
import {
  resolutionSchema,
  bodySchema,
} from '../schemas/schemas.js';
import { validator, checkTTL } from '../middlewares/validate.js';
import verifyToken from '../middlewares/verifyToken.js';
import restrictTo from '../middlewares/restrictRoute.js';
import constants from '../utils/constants.js';

const router = Router();

router
  .route('/me')
  .get(
    asyncHandler(verifyToken),
    restrictTo(constants.roles.patient),
    asyncHandler(findAllByUserId),
  );

router
  .route('/')
  .post(
    asyncHandler(verifyToken),
    restrictTo(constants.roles.doctor),
    validator(bodySchema, 'body'),
    validator(resolutionSchema, 'body'),
    checkTTL,
    asyncHandler(add),
  )
  .get(
    asyncHandler(verifyToken),
    restrictTo(constants.roles.doctor),
    asyncHandler(findAll),
  );

router
  .route('/:resolutionId')
  .delete(
    asyncHandler(verifyToken),
    restrictTo(constants.roles.doctor),
    asyncHandler(remove),
  );

export default router;
