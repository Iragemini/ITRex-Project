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
  try {
    const current = storage.length ? await queue.getCurrentKey() : '';
    options.currentPatient = current;
    options.searchInput = current;
    res.render('index', options);
  } catch (e) {
    console.log(e);
  }
};

export const add = async (req, res) => {
  const patient = req.body.newPatient;
  try {
    await addPatientToQueue(patient);
    res.status(201).redirect('/');
  } catch (e) {
    console.log(e);
  }
};

export const remove = async (req, res) => {
  const name = req.params.name;
  try {
    const { next } = await nextPatient(name);
    options.currentPatient = next ? next : '';
    options.searchInput = next ? next : '';
    res.render('index', options);
  } catch (e) {
    console.log(e);
  }
};
