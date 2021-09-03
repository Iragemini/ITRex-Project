import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticate } from '../user/user.controllers.js';
import { validator } from '../middlewares/validate.js';
import verifyEmail from '../middlewares/verifyEmail.js';
import { userSchema } from '../schemas/schemas.js';

const authRouter = Router();

authRouter.post('/', verifyEmail, validator(userSchema, 'body'), asyncHandler(authenticate));

export default authRouter;
