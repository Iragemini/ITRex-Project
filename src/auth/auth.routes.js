import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticate, create } from '../user/user.controllers.js';
import { validator } from '../middlewares/validate.js';
import { userLogInSchema, userSchema } from '../schemas/schemas.js';
import verifyUserEmail from '../middlewares/verifyUser.js';
import verifyEmail from '../middlewares/verifyEmail.js';

const authRouter = Router();

authRouter.post(
  '/login',
  validator(userLogInSchema, 'body'),
  asyncHandler(verifyUserEmail),
  asyncHandler(authenticate),
);

authRouter.post(
  '/signup',
  validator(userSchema, 'body'),
  asyncHandler(verifyEmail),
  asyncHandler(create),
);

export default authRouter;
