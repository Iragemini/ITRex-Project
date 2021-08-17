import { Router } from 'express';
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
  .get(validator(nameSchema, 'params'), find)
  .patch(
    validator(bodySchema, 'body'),
    validator(nameSchema, 'params'),
    validator(resolutionSchema, 'body'),
    checkTTL,
    add
  );
resolutionRouter.patch(
  `${prefix}/delete`,
  validator(nameSchema, 'params'),
  remove
);

export default resolutionRouter;
