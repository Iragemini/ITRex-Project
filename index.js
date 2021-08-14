import express from 'express';
import path from 'path';
import config from 'config';
import queueRouter from './src/Queue/queue.routes.js';
import resolutionRouter from './src/Resolution/resolution.routes.js';
import { handle } from './src/Errors/errorHandler.js';

const __dirname = path.resolve();
const PORT = config.get('port') || 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.use(queueRouter);
app.use(resolutionRouter);
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Clinic',
    currentPatient: '',
    searchInput: '',
    resolution: '',
  });
})
app.use((req, res, next) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ message: 'Route not found' });
    return;
  }
});
app.use(handle);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
