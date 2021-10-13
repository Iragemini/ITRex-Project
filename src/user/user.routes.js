import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import {
  update,
  remove,
  getById,
  setUserIdFromReq,
} from './user.controllers.js';
import verifyToken from '../middlewares/verifyToken.js';

const userRouter = Router();

userRouter
  .route('/')
  .put(asyncHandler(verifyToken), asyncHandler(update))
  .delete(asyncHandler(verifyToken), asyncHandler(remove));

userRouter
  .route('/me')
  .get(
    asyncHandler(verifyToken),
    setUserIdFromReq,
    asyncHandler(getById),
  );

export default userRouter;
