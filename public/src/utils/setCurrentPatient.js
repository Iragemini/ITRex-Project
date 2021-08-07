import storage from '../../storage/storage.js';

const { queue } = storage;
const currentInQueue = document.getElementById('currentInQueue');
const current = document.getElementById('current');

export default function setCurrentPatient(name, mode) {
  if (queue.length > 1 && mode === 'queue') {
    return;
  }
  currentInQueue.innerText = name;
  current.innerText = name;
}
