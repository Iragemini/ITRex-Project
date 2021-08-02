import express from 'express';
import path from 'path';
import storage from './public/storage/storage.js';

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
const app = express();
const { queue, patients } = storage;

app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { title: 'Clinic', queue, patients });
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
