import queue from './queue.storage.js';

const storage = await queue.get();

export const addPatientToQueue = async (patient) => {
  const [name, reason = ''] = patient.split(':');
  await queue.add(name, reason);
  return name;
};

export const nextPatient = async (name) => {
  const index = await queue.find(name);
  if (storage.length === 0) {
    return { next: null };
  }
  await queue.remove(index);
  if (storage.length > 0) {
    const next = await queue.getCurrentKey();
    return { next };
  }
  return { next: null };
};
