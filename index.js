import express from 'express';
import config from './config/config.js';
import queueRouter from './src/queue/queue.routes.js';
import resolutionRouter from './src/resolution/resolution.routes.js';
import { handle as errorHandler } from './src/middlewares/errorHandler.js';

const PORT = config.server.port;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', { title: 'Clinic' });
});

app.use('/api', queueRouter);
app.use('/api', resolutionRouter);
app.use((req, res, next) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ message: 'Route not found' });
  } else {
    res.send('Route not found');
  }
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
