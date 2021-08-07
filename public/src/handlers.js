import storage from '../storage/storage.js';
import { isExpired } from './utils/check.js';

const { queue, patients } = storage;

export const addResolution = (name, resolution, ttl = '') => {
  if (!name || queue.length === 0) {
    return;
  }
  let expire = '';
  if (ttl) {
    expire = ttl * 1000 + Date.now();
  }
  const resolutionObj = {
    resolution,
    expire,
  };
  if (patients.length === 0) {
    patients.push({ name, resolutionObj });
    return;
  }
  let isExists = false;
  const delimiter = '\n';
  for (let i = 0; i < patients.length; i += 1) {
    const patient = patients[i].name;
    if (patient === name) {
      const obj = patients[i].resolutionObj;
      if (obj.resolution.trim()) {
        obj.resolution += delimiter;
      }
      obj.resolution += resolution;
      obj.expire = expire;
      isExists = true;
      break;
    }
  }
  if (!isExists) {
    patients.push({ name, resolutionObj });
  }
};

export const addPatientToQueue = (patient) => {
  const [name, reason = ''] = patient.split(':');
  queue.push({ name, reason });
  return name;
};

export const deleteResolution = (name) => {
  const resolution = patients.filter((item) => item.name === name);
  if (resolution.length === 0) {
    return;
  }
  for (let i = 0; i < patients.length; i += 1) {
    const patient = patients[i].name;
    if (patient === name) {
      patients[i].resolutionObj.resolution = '';
      patients[i].resolutionObj.expire = '';
      break;
    }
  }
};

export const findResolution = (name) => {
  const message = 'No resolutions';
  const patient = patients.filter((item) => item.name === name);
  if (patient.length === 0) {
    return message;
  }
  const { expire } = patient[0].resolutionObj;

  if (!isExpired(expire)) {
    return patient[0].resolutionObj.resolution || message;
  }
  deleteResolution(name);
  return message;
};

export const deletePatientFromQueue = () => {
  const message = 'No patients in the queue';
  if (queue.length === 0) {
    return { message };
  }
  queue.splice(0, 1);
  if (queue.length > 0) {
    return { next: queue[0].name };
  }
  return { message };
};
