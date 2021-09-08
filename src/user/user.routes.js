import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  update,
  remove,
} from './user.controllers.js';
import verifyToken from '../middlewares/verifyToken.js';

const userRouter = Router();

userRouter
  .route('/')
  .put(verifyToken, asyncHandler(update))
  .delete(verifyToken, asyncHandler(remove));

export default userRouter;
