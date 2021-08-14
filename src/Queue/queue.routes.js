import { Router } from 'express';
import { add, remove, getCurrent } from './queue.controllers.js';
import { validator } from '../validate/validate.js';
import { nameSchema, bodySchema } from '../validate/schemas.js';

const queueRouter = Router();
const prefix = '/api/queue';

queueRouter.get(`${prefix}`, getCurrent);
queueRouter.post(`${prefix}`, validator(bodySchema, 'body'), add);
queueRouter.delete(`${prefix}/:name`, validator(nameSchema, 'params'), remove);

export default queueRouter;
