import { Router } from 'express';
import { add, remove, getCurrent } from './queue.controllers.js';

const queueRouter = Router();

queueRouter.get('/', getCurrent);
queueRouter.post('/queue/add', add);
queueRouter.delete('/queue/:name/delete', remove);

export default queueRouter;
