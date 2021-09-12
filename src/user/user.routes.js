import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { update, remove } from './user.controllers.js';
import verifyToken from '../middlewares/verifyToken.js';

const userRouter = Router();

userRouter
  .route('/')
  .put(asyncHandler(verifyToken), asyncHandler(update))
  .delete(asyncHandler(verifyToken), asyncHandler(remove));

export default userRouter;
