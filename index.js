import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import errorHandler from './src/middlewares/errorHandler.js';
import doctorRouter from './src/doctor/doctor.routes.js';
import queueRouter from './src/queue/queue.routes.js';
import resolutionRouter from './src/resolution/resolution.routes.js';
import userRouter from './src/user/user.routes.js';
import authRouter from './src/auth/auth.routes.js';
import db from './src/models/index.js';

const PORT = config.server.port;
const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', { title: 'Clinic' });
});

// api routes

app.use('/api', authRouter);
app.use('/api/queue', queueRouter);
app.use('/api/resolutions', resolutionRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/users', userRouter);

app.use((req, res) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ message: 'Route not found' });
  } else {
    res.send('Route not found');
  }
});

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server has been started on port ${PORT}...`);

  await db.init();
});
