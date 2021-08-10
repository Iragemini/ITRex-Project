import { Router } from 'express';
import { find, add, remove } from './resolution.controllers.js';

const resolutionRouter = Router();

resolutionRouter.get('/resolution/:name/show', find);
resolutionRouter.post('/resolution/:name/add', add);
resolutionRouter.delete('/resolution/:name/delete', remove);

export default resolutionRouter;
