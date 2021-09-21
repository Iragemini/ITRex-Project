import queueService from '../../http/queue.service.js';

const getCurrent = async () => {
  let currentPatient = '';
  const { current } = await queueService.getCurrentInQueue();
  if (current) {
    currentPatient = current.name;
  }
  return currentPatient;
};

export default async function setCurrentPatient() {
  const current = document.getElementById('current');
  const hiddenCurrent = document.getElementById('hiddenCurrent');
  const patientName = document.getElementById('patientName');
  try {
    const name = await getCurrent();
    current.innerText = name;
    hiddenCurrent.value = name;
    patientName.value = name;
  } catch (err) {
    console.log(err.text, err.message);
    current.innerText = err.message;
    hiddenCurrent.value = '';
    patientName.value = '';
  }
}
