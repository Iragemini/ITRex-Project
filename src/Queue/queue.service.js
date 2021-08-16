import { queue } from '../storage/index.js';
import ApiError from '../errors/ApiError.js';

const storage = await queue.get();

export const addPatientToQueue = async (patient) => {
  const [name, reason = ''] = patient.split(':');
  await queue.add(name, reason);
  return name;
};

export const nextPatient = async (name) => {
  let nextInQueue = null;
  const index = await queue.find(name.trim());
  if (index === null) {
    throw new ApiError(404, 'patient not found');
  }
  await queue.remove(index);

  if (storage.length && storage.length > index) {
    nextInQueue = await queue.getNameByIndex(index);
  }
  if (nextInQueue === null) {
    throw new ApiError(400, 'no patients in the queue');
  }
  return nextInQueue;
};

export const getCurrentPatient = async () => {
  let current = null;
  if (!storage.length) {
    throw new ApiError(400, 'no patients in the queue');
  }
  current = await queue.getCurrentKey();
  return current;
};
