import service from '../src/services/index.js';
import setCurrentPatient from '../src/utils/setCurrentPatient.js';

const ttlDiv = document.querySelector('.ttl__input');
const ttlCheckbox = document.getElementById('ttl');
const ttlInput = document.getElementById('ttlInput');
const deleteResolutionBtn = document.getElementById('deleteResolution');
const doctorResolutionFound = document.getElementById('doctorResolutionFound');
const patientName = document.getElementById('patientName');
const showResolution = document.getElementById('showResolution');
const newResolution = document.getElementById('newResolution');
const nextBtn = document.getElementById('next');
const hiddenCurrent = document.getElementById('hiddenCurrent');
const resolution = document.getElementById('doctorResolution');

ttlCheckbox.onchange = () => {
  ttlDiv.classList.toggle('ttl__input');
  ttlInput.value = '';
};

showResolution.onclick = () => {
  doctorResolutionFound.value = '';
  const name = patientName.value.trim();
  service
    .getResolution(name)
    .then((result) => {
      doctorResolutionFound.value = result.resolution;
    })
    .catch((e) => {
      console.log(e.text);
      doctorResolutionFound.value = e.message;
    });
};

deleteResolutionBtn.onclick = () => {
  const name = patientName.value.trim();
  service.deleteResolution(name).catch((e) => {
    console.log(e.text);
    doctorResolutionFound.value = e.message;
  });
  doctorResolutionFound.value = '';
};

newResolution.onclick = () => {
  const data = { resolution: resolution.value, ttl: ttlInput.value };
  service
    .patchResolution(hiddenCurrent.value, data)
    .then(() => {
      resolution.value = '';
      if (ttlCheckbox.checked) {
        ttlCheckbox.click();
      }
    })
    .catch((e) => {
      console.log(e.text);
    });
};

nextBtn.onclick = () => {
  doctorResolutionFound.value = '';
  service
    .deletePatientFromQueue(hiddenCurrent.value)
    .then((result) => {
      setCurrentPatient(result.next, '');
    })
    .catch((e) => {
      console.log(e.text);
      setCurrentPatient(e.message, 'err');
    });
};
