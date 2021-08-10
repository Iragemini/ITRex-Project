import { addPatientToQueue, nextPatient } from './queue.service.js';
import queue from './queue.storage.js';

const options = {
  title: 'Clinic',
  currentPatient: '',
  searchInput: '',
  resolution: '',
};

const storage = await queue.get();

export const getCurrent = async (req, res) => {
  const current = storage.length ? await queue.getCurrentKey() : '';
  options.currentPatient = current;
  options.searchInput = current;
  res.render('index', options);
};

export const add = async (req, res) => {
  const patient = req.body.newPatient;
  await addPatientToQueue(patient);
  res.status(201).redirect('/');
};

export const remove = async (req, res) => {
  const name = req.params.name;
  const { next } = await nextPatient(name);
  options.currentPatient = next ? next : '';
  options.searchInput = next ? next : '';
  res.render('index', options);
};
