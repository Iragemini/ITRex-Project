import express from 'express';
import storage from './public/storage/storage.js';

const PORT = process.env.PORT || 3000;
const app = express();
const { queue } = storage;

app.set('view engine', 'ejs');
app.set('views', './public');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index', { title: 'Clinic', queue });
});

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
