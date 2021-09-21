import queueService from '../../http/queue.service.js';

const getCurrent = async () => {
  let currentPatient = '';
  let patientId = '';
  const { current } = await queueService.getCurrentInQueue();
  if (current) {
    currentPatient = current.name;
    patientId = current.id;
  }
  return { currentPatient, patientId };
};

export default async function setCurrentPatient() {
  const current = document.getElementById('current');
  const hiddenPatientId = document.getElementById('hiddenPatientId');
  const patientName = document.getElementById('patientName');
  try {
    const { currentPatient: name, patientId: id } = await getCurrent();
    current.innerText = name;
    hiddenPatientId.value = id;
    patientName.value = name;
  } catch (err) {
    console.log(err.text, err.message);
    current.innerText = err.message;
    hiddenPatientId.value = '';
    patientName.value = '';
  }
}
