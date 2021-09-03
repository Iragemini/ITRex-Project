import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import queueRouter from './src/queue/queue.routes.js';
import resolutionRouter from './src/resolution/resolution.routes.js';
import errorHandler from './src/middlewares/errorHandler.js';
import db from './src/models/index.js';
import userRouter from './src/user/user.routes.js';
import authRouter from './src/auth/auth.routes.js';

const PORT = config.server.port;
const app = express();

const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', { title: 'Clinic' });
});

app.use('/api/signin', authRouter);
app.use('/api/user', userRouter);
app.use('/api', queueRouter);
app.use('/api', resolutionRouter);
app.use((req, res) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ message: 'Route not found' });
  } else {
    res.send('Route not found');
  }
});
app.use(errorHandler);
if (process.env.NODE_ENV === 'local') {
  db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');
  });
} else {
  db.sequelize.sync();
}

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
