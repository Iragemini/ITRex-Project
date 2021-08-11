import { Router } from 'express';
import { add, remove, getCurrent } from './queue.controllers.js';
import { validator } from '../validate/validate.js';
import { nameSchema } from '../validate/schemas.js';

const queueRouter = Router();

queueRouter.get('/', getCurrent);
queueRouter.post('/queue/add', add);
queueRouter.delete(
  '/queue/:name/delete',
  validator(nameSchema, 'params'),
  remove
);

export default queueRouter;
