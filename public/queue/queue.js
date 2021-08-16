import queueService from '../http/queue.service.js';
import setCurrentPatient from '../src/utils/setCurrentPatient.js';

const addPatient = document.getElementById('addPatient');
const newPatient = document.getElementById('newPatient');
const searchResolution = document.getElementById('searchResolution');
const queueResolution = document.getElementById('queueResolution');

addPatient.onclick = async () => {
  if (newPatient.value.trim() === '') {
    newPatient.classList.add('is-invalid');
    return;
  }
  newPatient.classList.remove('is-invalid');
  const data = { patient: newPatient.value.trim() };
  try {
    const { name } = await queueService.postPatientInQueue(data);
    setCurrentPatient(name, 'queue');
    newPatient.value = '';
  } catch (e) {
    console.log(e.text);
  }
};

searchResolution.onkeyup = async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    queueResolution.value = '';
    const name = searchResolution.value.trim();
    try {
      const { resolution } = await queueService.getResolution(name);
      if (resolution) {
        queueResolution.value = resolution;
      }
    } catch (err) {
      console.log(err.text);
      queueResolution.value = err.message;
    }
  }
};
