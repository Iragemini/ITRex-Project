const currentInQueue = document.getElementById('currentInQueue');
const current = document.getElementById('current');
const hiddenCurrent = document.getElementById('hiddenCurrent');
const patientName = document.getElementById('patientName');

export default function setCurrentPatient(name, mode) {
  if (mode === 'queue' && hiddenCurrent.value) {
    return;
  }
  currentInQueue.innerText = name;
  current.innerText = name;
  hiddenCurrent.value = name;
  if (patientName) {
    patientName.value = name;
  }
  if (mode === 'err') {
    hiddenCurrent.value = '';
    patientName.value = '';
  }
}
