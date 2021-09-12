import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { authenticate, create, signout } from '../user/user.controllers.js';
// import { validator } from '../middlewares/validate.js';
// import { userLogInSchema, userSchema } from '../schemas/schemas.js';

const authRouter = Router();

authRouter.post(
  '/login',
  // validator(userLogInSchema, 'body'),
  asyncHandler(authenticate),
);

authRouter.post(
  '/signup',
  // validator(userSchema, 'body'),
  asyncHandler(create),
);

authRouter.get(
  '/signout',
  asyncHandler(signout),
);

export default authRouter;
