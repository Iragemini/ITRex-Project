import {
  addPatientToQueue,
  findResolution,
} from '../src/handlers.js';
import setCurrentPatient from '../src/utils/setCurrentPatient.js';

const addPatient = document.getElementById('addPatient');
const searchResolution = document.getElementById('searchResolution');
const queueResolution = document.getElementById('queueResolution');
const newPatient = document.getElementById('newPatient');

addPatient.onclick = () => {
  if (newPatient.value.trim() === '') {
    newPatient.classList.add('is-invalid');
    return;
  }
  newPatient.classList.remove('is-invalid');
  const name = addPatientToQueue(newPatient.value.trim());
  setCurrentPatient(name, 'queue');
  newPatient.value = '';
};

searchResolution.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const name = searchResolution.value.trim();
    const resolution = findResolution(name);
    queueResolution.value = resolution;
  }
});
