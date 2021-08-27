import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { find, add, remove } from './resolution.controllers.js';
import {
  nameSchema,
  resolutionSchema,
  bodySchema,
} from '../schemas/schemas.js';
import { validator, checkTTL } from '../middlewares/validate.js';

const resolutionRouter = Router();
const prefix = '/resolution/:name';

resolutionRouter
  .route(prefix)
  .get(validator(nameSchema, 'params'), asyncHandler(find))
  .patch(
    validator(bodySchema, 'body'),
    validator(nameSchema, 'params'),
    validator(resolutionSchema, 'body'),
    checkTTL,
    asyncHandler(add),
  );
resolutionRouter.patch(
  `${prefix}/delete`,
  validator(nameSchema, 'params'),
  asyncHandler(remove),
);

export default resolutionRouter;
