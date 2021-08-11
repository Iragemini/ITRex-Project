const ttlDiv = document.querySelector('.ttl__input');
const ttlCheckbox = document.getElementById('ttl');
const ttlInput = document.getElementById('ttlInput');
const deleteResolutionBtn = document.getElementById('deleteResolution');
const doctorResolutionFound = document.getElementById('doctorResolutionFound');
const patientName = document.getElementById('patientName');
const showResolution = document.getElementById('showResolution');

const url = 'http://localhost:3000';

ttlCheckbox.onchange = () => {
  ttlDiv.classList.toggle('ttl__input');
  ttlInput.value = '';
};

showResolution.onclick = async () => {
  doctorResolutionFound.value = '';
  const name = patientName.value.trim();
  const response = await fetch(`${url}/resolution/${name}/show`);
  if (!response.ok) {
    const error = await response.json();
    doctorResolutionFound.value = error.message;
    return;
  }
  doctorResolutionFound.value = await response.json();
};

deleteResolutionBtn.onclick = async () => {
  const name = patientName.value.trim();
  const response = await fetch(`${url}/resolution/${name}/delete`, {
    method: 'DELETE',
  });
  if (response.ok) {
    doctorResolutionFound.value = '';
  } else {
    doctorResolutionFound.value = await response.json();
  }
};
