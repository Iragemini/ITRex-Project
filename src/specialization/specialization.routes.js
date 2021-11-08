import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import getAll from './specialization.controllers.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = Router();

router.use(asyncHandler(verifyToken));

router.get('/', asyncHandler(getAll));

export default router;
