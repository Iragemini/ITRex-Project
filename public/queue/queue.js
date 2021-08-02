import {
  addPatientToQueue,
  findResolution,
  setCurrentPatient,
} from '../src/handlers.js';

const addPatient = document.getElementById('addPatient');
const searchResolution = document.getElementById('searchResolution');
const currentInQueue = document.getElementById('currentInQueue');
const current = document.getElementById('current');
const queueResolution = document.getElementById('queueResolution');

addPatient.onclick = () => {
  const newPatient = document.getElementById('newPatient');
  if (newPatient.value === '') {
    newPatient.classList.add('is-invalid');
    return;
  }
  newPatient.classList.remove('is-invalid');
  const name = addPatientToQueue(newPatient.value);
  setCurrentPatient(name, currentInQueue, current);
  newPatient.value = '';
};

searchResolution.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const name = searchResolution.value;
    const resolution = findResolution(name);
    queueResolution.value = resolution;
  }
});
