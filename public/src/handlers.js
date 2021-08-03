import storage from '../storage/storage.js';

const { queue, patients } = storage;

const currentInQueue = document.getElementById('currentInQueue');
const current = document.getElementById('current');

export const setCurrentPatient = (name, mode) => {
  if (queue.length > 1 && mode === 'queue') {
    return;
  }
  currentInQueue.innerText = name;
  current.innerText = name;
};

export const addResolution = (name, resolution) => {
  if (patients.length === 0) {
    patients.push({ name, resolution });
    return;
  }
  let isExists = false;
  const delimiter = '\n';
  for (let i = 0; i < patients.length; i += 1) {
    const patient = patients[i].name;
    if (patient === name) {
      if (patients[i].resolution.trim()) {
        patients[i].resolution += delimiter;
      }
      patients[i].resolution += resolution;
      isExists = true;
      break;
    }
  }
  if (!isExists) {
    patients.push({ name, resolution });
  }
};

export const addPatientToQueue = (patient) => {
  const [name, reason = ''] = patient.split(':');
  queue.push({ name, reason });
  return name;
};

export const findResolution = (name) => {
  const message = 'No resolutions';
  const resolution = patients.filter((item) => item.name === name);
  if (resolution.length === 0) {
    return message;
  }
  if (resolution.length > 1) {
    let allResolutions = '';
    const delimiter = '\n';
    resolution.forEach((item) => {
      if (allResolutions) {
        allResolutions += delimiter;
      }
      allResolutions += item.resolution;
    });
    return allResolutions;
  }
  return resolution[0].resolution || message;
};

export const deleteResolution = (name) => {
  const resolution = patients.filter((item) => item.name === name);
  if (resolution.length === 0) {
    return;
  }
  for (let i = 0; i < patients.length; i += 1) {
    const patient = patients[i].name;
    if (patient === name) {
      patients[i].resolution = '';
      break;
    }
  }
};

export const deletePatientFromQueue = () => {
  const message = 'No patients in the queue';
  if (queue.length === 0) {
    return { message };
  }
  const previous = queue.splice(0, 1);
  if (queue.length > 0) {
    setCurrentPatient(queue[0].name, '');
    return { previous };
  }
  setCurrentPatient(message, '');
  return { previous };
};
