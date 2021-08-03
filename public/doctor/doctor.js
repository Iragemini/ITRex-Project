import {
  addResolution,
  findResolution,
  deleteResolution,
  deletePatientFromQueue,
} from '../src/handlers.js';

const newResolution = document.getElementById('newResolution');
const current = document.getElementById('current');
const showResolution = document.getElementById('showResolution');
const searchResolutionByDoctor = document.getElementById('searchResolutionByDoctor');
const doctorResolutionFound = document.getElementById('doctorResolutionFound');
const deleteResolutionBtn = document.getElementById('deleteResolution');
const nextBtn = document.getElementById('next');

newResolution.onclick = () => {
  const resolution = document.getElementById('doctorResolution');
  addResolution(current.innerText, resolution.value);
  resolution.value = '';
};

showResolution.onclick = () => {
  const resolution = findResolution(searchResolutionByDoctor.value.trim());
  doctorResolutionFound.value = resolution;
};

deleteResolutionBtn.onclick = () => {
  deleteResolution(searchResolutionByDoctor.value.trim());
  doctorResolutionFound.value = '';
};

nextBtn.onclick = () => {
  const deleted = deletePatientFromQueue();
  if (deleted.message) {
    current.innerText = deleted.message;
  }
};
