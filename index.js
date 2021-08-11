import express from 'express';
import path from 'path';
import methodOverride from 'method-override';
import { config } from './config/default.json';
import queueRouter from './src/Queue/queue.routes.js';
import resolutionRouter from './src/Resolution/resolution.routes.js';
import { handle } from './src/Errors/errorHandler.js';

const PORT = config.get('port') || 3000;
const __dirname = path.resolve();
const app = express();

app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(queueRouter);
app.use(resolutionRouter);
app.use((req, res, next) => {
  res.status(404);
  if (req.accepts('json')) {
    res.json({ error: 'Not found' });
    return;
  }
});
app.use(handle);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
