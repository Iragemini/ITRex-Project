import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { getById, setUserIdFromReq } from './user.controllers.js';
import verifyToken from '../middlewares/verifyToken.js';

const userRouter = Router();

userRouter
  .route('/me')
  .get(asyncHandler(verifyToken), setUserIdFromReq, asyncHandler(getById));

export default userRouter;
