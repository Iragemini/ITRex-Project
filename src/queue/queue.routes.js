import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { add, remove, getCurrent } from './queue.controllers.js';
// import { validator } from '../middlewares/validate.js';
// import { bodySchema } from '../schemas/schemas.js';
import verifyToken from '../middlewares/verifyToken.js';
import restrictTo from '../middlewares/restrictRoute.js';

const queueRouter = Router();

// route for doctors, their doctorId is in JWT
queueRouter
  .route('/')
  .get(
    asyncHandler(verifyToken),
    restrictTo('doctor'),
    asyncHandler(getCurrent),
  )
  .delete(
    asyncHandler(verifyToken),
    restrictTo('doctor'),
    asyncHandler(remove),
  );

// route for patients, they need to specify the doctorId
queueRouter
  .route('/:doctorId')
  .post(
    asyncHandler(verifyToken),
    restrictTo('patient'),
    asyncHandler(add),
  )
  .get(
    asyncHandler(verifyToken),
    restrictTo('patient'),
    asyncHandler(getCurrent),
  );

export default queueRouter;
