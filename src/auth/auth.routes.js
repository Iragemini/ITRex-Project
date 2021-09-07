import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticate } from '../user/user.controllers.js';
import { validator } from '../middlewares/validate.js';
import { userLogInSchema } from '../schemas/schemas.js';
import { verifyUserEmail } from '../middlewares/verifyUser.js';

const authRouter = Router();

authRouter.post(
  '/',
  validator(userLogInSchema, 'body'),
  asyncHandler(verifyUserEmail),
  asyncHandler(authenticate),
);

export default authRouter;
