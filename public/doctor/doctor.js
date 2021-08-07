import {
  addResolution,
  findResolution,
  deleteResolution,
  deletePatientFromQueue,
} from '../src/handlers.js';
import { checkTTL } from '../src/utils/check.js';
import setCurrentPatient from '../src/utils/setCurrentPatient.js';

const newResolution = document.getElementById('newResolution');
const current = document.getElementById('current');
const showResolution = document.getElementById('showResolution');
const searchResolutionByDoctor = document.getElementById('searchResolutionByDoctor');
const doctorResolutionFound = document.getElementById('doctorResolutionFound');
const deleteResolutionBtn = document.getElementById('deleteResolution');
const nextBtn = document.getElementById('next');
const resolution = document.getElementById('doctorResolution');
const ttlDiv = document.querySelector('.ttl__input');
const ttlCheckbox = document.getElementById('ttl');
const ttlInput = document.getElementById('ttlInput');

newResolution.onclick = () => {
  let ttl = null;

  if (ttlCheckbox.checked && !checkTTL(ttlInput.value)) {
    ttlInput.classList.add('is-invalid');
    ttlInput.value = '';
    return;
  }
  ttlInput.classList.remove('is-invalid');
  ttl = ttlCheckbox.checked ? ttlInput.value : null;

  addResolution(current.innerText, resolution.value, ttl);
  resolution.value = '';
  if (ttlCheckbox.checked) {
    ttlCheckbox.click();
  }
};

showResolution.onclick = () => {
  const foundResolution = findResolution(searchResolutionByDoctor.value.trim());
  doctorResolutionFound.value = foundResolution;
};

deleteResolutionBtn.onclick = () => {
  deleteResolution(searchResolutionByDoctor.value.trim());
  doctorResolutionFound.value = '';
};

nextBtn.onclick = () => {
  const deleted = deletePatientFromQueue();
  if (deleted.message) {
    setCurrentPatient(deleted.message, '');
    return;
  }
  setCurrentPatient(deleted.next, '');
};

ttlCheckbox.onchange = () => {
  ttlDiv.classList.toggle('ttl__input');
  ttlInput.value = '';
};
