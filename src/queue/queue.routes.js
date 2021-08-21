import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { add, remove, getCurrent } from './queue.controllers.js';
import { validator } from '../middlewares/validate.js';
import { nameSchema, bodySchema } from '../schemas/schemas.js';

const queueRouter = Router();
const prefix = '/queue';

queueRouter
  .route(prefix)
  .get(asyncHandler(getCurrent))
  .post(validator(bodySchema, 'body'), asyncHandler(add));

queueRouter.delete(`${prefix}/:name`, validator(nameSchema, 'params'), asyncHandler(remove));

export default queueRouter;
