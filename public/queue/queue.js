import service from '../src/services/index.js';
import setCurrentPatient from '../src/utils/setCurrentPatient.js';

const addPatient = document.getElementById('addPatient');
const newPatient = document.getElementById('newPatient');
const searchResolution = document.getElementById('searchResolution');
const queueResolution = document.getElementById('queueResolution');

addPatient.onclick = () => {
  if (newPatient.value.trim() === '') {
    newPatient.classList.add('is-invalid');
    return;
  }
  newPatient.classList.remove('is-invalid');
  const data = { patient: newPatient.value.trim() };
  service
    .postPatientInQueue(data)
    .then((result) => {
      setCurrentPatient(result.name, 'queue');
      newPatient.value = '';
    })
    .catch((e) => {
      console.log(e.text);
    });
};

searchResolution.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    queueResolution.value = '';
    const name = searchResolution.value.trim();
    service
      .getResolution(name)
      .then((result) => {
        queueResolution.value = result.resolution;
      })
      .catch((err) => {
        console.log(err.text);
        queueResolution.value = err.message;
      });
  }
});
