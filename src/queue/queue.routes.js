import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { add, remove, getCurrent } from './queue.controllers.js';
import { validator } from '../middlewares/validate.js';
import { bodySchema } from '../schemas/schemas.js';
import verifyToken from '../middlewares/verifyToken.js';

const queueRouter = Router();
const prefix = '/queue';

queueRouter
  .route(prefix)
  .get(asyncHandler(getCurrent))
  .post(verifyToken, validator(bodySchema, 'body'), asyncHandler(add))
  .delete(asyncHandler(remove));

export default queueRouter;
