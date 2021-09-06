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
import { verifyUserId } from '../middlewares/verifyUser.js';
import { userSchema } from '../schemas/schemas.js';

const userRouter = Router();

userRouter
  .route('/')
  .post(
    validator(userSchema, 'body'),
    asyncHandler(verifyEmail),
    asyncHandler(create),
  )
  .get(asyncHandler(get));

userRouter
  .route('/:id')
  .put(asyncHandler(verifyUserId), asyncHandler(update))
  .delete(asyncHandler(verifyUserId), asyncHandler(remove));

export default userRouter;
