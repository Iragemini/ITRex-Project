import express from 'express';
import path from 'path';
import methodOverride from 'method-override';
import queueRouter from './src/Queue/queue.routes.js';
import resolutionRouter from './src/Resolution/resolution.routes.js';

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
console.log(__dirname);
const app = express();

app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(queueRouter);
app.use(resolutionRouter);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
