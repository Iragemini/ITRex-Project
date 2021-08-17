import { Router } from 'express';
import { add, remove, getCurrent } from './queue.controllers.js';
import { validator } from '../middlewares/validate.js';
import { nameSchema, bodySchema } from '../schemas/schemas.js';

const queueRouter = Router();
const prefix = '/queue';

queueRouter
  .route(prefix)
  .get(getCurrent)
  .post(validator(bodySchema, 'body'), add);

queueRouter.delete(`${prefix}/:name`, validator(nameSchema, 'params'), remove);

export default queueRouter;
