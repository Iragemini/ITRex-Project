import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  find,
  add,
  remove,
  getUserResolution,
} from './resolution.controllers.js';
import {
  nameSchema,
  resolutionSchema,
  bodySchema,
} from '../schemas/schemas.js';
import { validator, checkTTL } from '../middlewares/validate.js';
import verifyToken from '../middlewares/verifyToken.js';

const resolutionRouter = Router();

resolutionRouter
  .route('/doctor/:name')
  .get(validator(nameSchema, 'params'), asyncHandler(find))
  .patch(
    validator(bodySchema, 'body'),
    validator(nameSchema, 'params'),
    validator(resolutionSchema, 'body'),
    checkTTL,
    asyncHandler(add),
  );
resolutionRouter.patch('/doctor/:name/delete', validator(nameSchema, 'params'), asyncHandler(remove));

resolutionRouter.get('/patient', verifyToken, asyncHandler(getUserResolution));

export default resolutionRouter;
