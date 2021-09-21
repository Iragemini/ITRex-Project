import resolutionService from '../../http/resolution.service.js';
import queueService from '../../http/queue.service.js';
import setCurrentPatient from '../../src/utils/setCurrentPatient.js';
import createTable from './resolutionsTable.js';
import Roles from '../../src/utils/roles.js';

export const changeTTL = () => {
  const ttlDiv = document.querySelector('.ttl__div');
  const ttlInput = document.getElementById('ttlInput');
  ttlDiv.classList.toggle('ttl__input');
  ttlInput.value = '';
};

export const showResolutionDoctor = async () => {
  const doctorResolutionFound = document.getElementById('doctorResolutionFound');
  const patientName = document.getElementById('patientName');
  doctorResolutionFound.value = '';
  const name = patientName.value.trim();
  if (!name) {
    return;
  }
  try {
    const { data } = await resolutionService.getResolutions(name);
    if (data) {
      createTable(doctorResolutionFound, data, Roles.DOCTOR);
    }
  } catch (e) {
    console.log(e.text);
    doctorResolutionFound.value = e.message;
  }
};

export const deleteResolution = async () => {
  const patientName = document.getElementById('patientName');
  const doctorResolutionFound = document.getElementById('doctorResolutionFound');
  const name = patientName.value.trim();
  try {
    await resolutionService.deleteResolution(name);
    doctorResolutionFound.value = '';
  } catch (e) {
    console.log(e.text);
    doctorResolutionFound.value = e.message;
  }
};

export const newResolution = async () => {
  const doctorResolution = document.getElementById('doctorResolution');
  const ttlInput = document.getElementById('ttlInput');
  const ttlCheckbox = document.getElementById('ttl');
  const hiddenPatientId = document.getElementById('hiddenPatientId');
  const data = {
    patientId: hiddenPatientId.value,
    resolution: doctorResolution.value,
    ttl: ttlInput.value || undefined,
  };
  try {
    await resolutionService.postResolution(data);
    doctorResolution.value = '';
    if (ttlCheckbox.checked) {
      ttlCheckbox.click();
    }
  } catch (e) {
    console.log(e.text);
  }
};

export const nextPatient = async () => {
  const doctorResolutionFound = document.getElementById('doctorResolutionFound');
  doctorResolutionFound.value = '';
  try {
    await queueService.deletePatientFromQueue();
  } catch (e) {
    console.log(e.text);
  } finally {
    await setCurrentPatient();
  }
};
