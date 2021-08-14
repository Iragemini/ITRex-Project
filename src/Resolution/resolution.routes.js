import { Router } from 'express';
import { find, add, remove } from './resolution.controllers.js';
import {
  nameSchema,
  resolutionSchema,
  bodySchema,
} from '../validate/schemas.js';
import { validator, checkTTL } from '../validate/validate.js';

const resolutionRouter = Router();
const prefix = '/api/resolution';

resolutionRouter.get(`${prefix}/:name`, validator(nameSchema, 'params'), find);
resolutionRouter.patch(
  `${prefix}/:name`,
  validator(bodySchema, 'body'),
  validator(nameSchema, 'params'),
  validator(resolutionSchema, 'body'),
  checkTTL,
  add
);
resolutionRouter.patch(
  `${prefix}/:name/delete`,
  validator(nameSchema, 'params'),
  remove
);

export default resolutionRouter;
