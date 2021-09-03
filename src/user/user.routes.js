import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  create,
  get,
  update,
  remove,
} from './user.controllers.js';
import { validator } from '../middlewares/validate.js';
import verifyEmail from '../middlewares/verifyEmail.js';
import verifyUser from '../middlewares/verifyUser.js';
import { userSchema } from '../schemas/schemas.js';

const userRouter = Router();

userRouter.post('/', verifyEmail, validator(userSchema, 'body'), asyncHandler(create));

userRouter.get('/', asyncHandler(get));

userRouter
  .route('/:id')
  .put(verifyUser, asyncHandler(update))
  .delete(verifyUser, asyncHandler(remove));

export default userRouter;
