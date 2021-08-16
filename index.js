import express from 'express';
import config from './config/config.js';
import queueRouter from './src/queue/queue.routes.js';
import resolutionRouter from './src/resolution/resolution.routes.js';
import { handle } from './src/middlewares/errorHandler.js';

const PORT = config.server.port || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.static('public'));
app.use(express.json());

app.use(queueRouter);
app.use(resolutionRouter);
app.use((req, res, next) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ message: 'Route not found' });
  } else {
    res.send('Route not found');
  }
});
app.use(handle);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
