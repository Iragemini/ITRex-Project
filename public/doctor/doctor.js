import { addResolution, findResolution } from '../src/handlers.js';

const newResolution = document.getElementById('newResolution');
const current = document.getElementById('current');
const showResolution = document.getElementById('showResolution');
const searchResolutionByDoctor = document.getElementById('searchResolutionByDoctor');
const doctorResolutionFound = document.getElementById('doctorResolutionFound');

newResolution.onclick = () => {
  const resolution = document.getElementById('doctorResolution');
  addResolution(current.innerText, resolution.value);
};

showResolution.onclick = () => {
    const resolution = findResolution(searchResolutionByDoctor.value);
    doctorResolutionFound.value = resolution;
}
