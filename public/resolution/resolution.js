import resolutionService from '../http/resolution.service.js';
import queueService from '../http/queue.service.js';
import setCurrentPatient from '../src/utils/setCurrentPatient.js';

const ttlDiv = document.querySelector('.ttl__input');
const ttlCheckbox = document.getElementById('ttl');
const ttlInput = document.getElementById('ttlInput');
const deleteResolutionBtn = document.getElementById('deleteResolution');
const doctorResolutionFound = document.getElementById('doctorResolutionFound');
const patientName = document.getElementById('patientName');
const showResolution = document.getElementById('showResolution');
const newResolution = document.getElementById('newResolution');
const nextBtn = document.getElementById('next');
const hiddenCurrent = document.getElementById('hiddenCurrent');
const doctorResolution = document.getElementById('doctorResolution');

ttlCheckbox.onchange = () => {
  ttlDiv.classList.toggle('ttl__input');
  ttlInput.value = '';
};

showResolution.onclick = async () => {
  doctorResolutionFound.value = '';
  const name = patientName.value.trim();
  try {
    const { resolution } = await resolutionService.getResolution(name);
    if (resolution) {
      doctorResolutionFound.value = resolution;
    }
  } catch (e) {
    console.log(e.text);
    doctorResolutionFound.value = e.message;
  }
};

deleteResolutionBtn.onclick = async () => {
  const name = patientName.value.trim();
  try {
    await resolutionService.deleteResolution(name);
    doctorResolutionFound.value = '';
  } catch (e) {
    console.log(e.text);
    doctorResolutionFound.value = e.message;
  }
};

newResolution.onclick = async () => {
  const data = { resolution: doctorResolution.value, ttl: ttlInput.value };
  try {
    await resolutionService.patchResolution(hiddenCurrent.value, data);
    doctorResolution.value = '';
    if (ttlCheckbox.checked) {
      ttlCheckbox.click();
    }
  } catch (e) {
    console.log(e.text);
  }
};

nextBtn.onclick = async () => {
  doctorResolutionFound.value = '';
  try {
    const { next } = await queueService.deletePatientFromQueue(hiddenCurrent.value);
    setCurrentPatient(next, '');
  } catch (e) {
    console.log(e.text);
    setCurrentPatient(e.message, 'err');
  }
};
