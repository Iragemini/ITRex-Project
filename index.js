import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
