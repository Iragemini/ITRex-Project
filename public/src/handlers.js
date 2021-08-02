import storage from '../storage/storage.js';

const { queue, patients } = storage;

export const setCurrentPatient = (name, currentInQueue, current) => {
  if (currentInQueue.innerText === '') {
    currentInQueue.innerText = name;
  }
  if (current.innerText === '') {
    current.innerText = name;
  }
};

export const addResolution = (name, resolution) => {
  if (patients.length === 0) {
    patients.push({ name, resolution });
    return;
  }
  const isExists = false;
  for (let i = 0; i < patients.length; i += 1) {
    const patient = patients[i].name;
    if (patient === name) {
      patient[i].resolution += resolution;
      isExists = true;
      break;
    }
  }
  if (!isExists) {
    patients.push({ name, resolution });
  }
  console.log('resolutions', patients)
  return;
};

export const addPatientToQueue = (patient) => {
  const [name, reason = ''] = patient.split(':');
  queue.push({ name, reason });
  return name;
};

export const findResolution = (name) => {
  const resolution = patients.filter((item) => item.name === name);
  if (resolution.length === 0) {
    return 'No resolution';
  }
  if (resolution.length > 1) {
    let allResolutions = '';
    resolution.forEach((item) => {
      if (allResolutions) {
        allResolutions += '\n';
      }
      allResolutions += item.resolution;
    });
    return allResolutions;
  }
  return resolution[0].resolution;
};
