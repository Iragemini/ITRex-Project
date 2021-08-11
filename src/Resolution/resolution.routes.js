import { Router } from 'express';
import { find, add, remove } from './resolution.controllers.js';
import { nameSchema, resolutionSchema } from '../validate/schemas.js';
import { validator, checkTTL } from '../validate/validate.js';

const resolutionRouter = Router();

resolutionRouter.get(
  '/resolution/:name/show',
  validator(nameSchema, 'params'),
  find
);
resolutionRouter.post(
  '/resolution/:name/add',
  validator(nameSchema, 'params'),
  validator(resolutionSchema, 'body'),
  checkTTL,
  add
);
resolutionRouter.delete(
  '/resolution/:name/delete',
  validator(nameSchema, 'params'),
  remove
);

export default resolutionRouter;
