import express from 'express';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(), './newFront/public/html/main.html'));
});

router.get('/docsignin', (req, res) => {
  res.sendFile(path.join(path.resolve(), './newFront/public/html/doctorSignin.html'));
});

router.get('/signin', (req, res) => {
  res.sendFile(path.join(path.resolve(), './newFront/public/html/signin.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(path.resolve(), './newFront/public/html/signup.html'));
});

router.get('/doctor-:doctorId', (req, res) => {
  res.sendFile(path.join(path.resolve(), './newFront/public/html/queue.html'));
});

router.get('/process', (req, res) => {
  res.sendFile(path.join(path.resolve(), './newFront/public/html/process.html'));
});

router.get('/personal-resolutions', (req, res) => {
  res.sendFile(path.join(path.resolve(), './newFront/public/html/personalResolutions.html'));
});

router.get('/resolutions', (req, res) => {
  res.sendFile(path.join(path.resolve(), './newFront/public/html/resolutionsSearch.html'));
});

export default router;
