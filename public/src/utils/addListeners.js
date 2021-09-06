import { loginUser, signupUser } from '../../components/auth/auth.js';
import { makeAppointment, logoutUser, showResolution } from '../../components/account/account.js';
import {
  changeTTL,
  deleteResolution,
  newResolution,
  nextPatient,
  showResolutionDoctor,
} from '../../components/resolution/resolution.js';

const addListeners = () => {
  const loginBtn = document.getElementById('login');
  const signupBtn = document.getElementById('signup');
  const makeAppointmentBtn = document.getElementById('makeAppointment');
  const showResolutionBtn = document.getElementById('showResolution');
  const logOutBtn = document.getElementById('logout');
  const showResolutionDoctorBtn = document.getElementById('showResolutionDoctor');
  const newResolutionBtn = document.getElementById('newResolution');
  const nextBtn = document.getElementById('next');
  const deleteResolutionBtn = document.getElementById('deleteResolution');
  const ttlCheckbox = document.getElementById('ttl');

  /* auth */
  if (loginBtn) {
    loginBtn.removeEventListener('click', loginUser);
    loginBtn.addEventListener('click', () => loginUser());
  }
  if (signupBtn) {
    signupBtn.removeEventListener('click', signupUser);
    signupBtn.addEventListener('click', () => signupUser());
  }

  /* account */
  if (makeAppointmentBtn) {
    makeAppointmentBtn.removeEventListener('click', makeAppointment);
    makeAppointmentBtn.addEventListener('click', () => makeAppointment());
  }
  if (showResolutionBtn) {
    showResolutionBtn.removeEventListener('click', showResolution);
    showResolutionBtn.addEventListener('click', () => showResolution());
  }
  if (logOutBtn) {
    logOutBtn.removeEventListener('click', logoutUser);
    logOutBtn.addEventListener('click', () => logoutUser());
  }

  /* doctor page */
  if (showResolutionDoctorBtn) {
    showResolutionDoctorBtn.removeEventListener('click', showResolutionDoctor);
    showResolutionDoctorBtn.addEventListener('click', () => showResolutionDoctor());
  }
  if (newResolutionBtn) {
    newResolutionBtn.removeEventListener('click', newResolution);
    newResolutionBtn.addEventListener('click', () => newResolution());
  }
  if (nextBtn) {
    nextBtn.removeEventListener('click', nextPatient);
    nextBtn.addEventListener('click', () => nextPatient());
  }
  if (deleteResolutionBtn) {
    deleteResolutionBtn.removeEventListener('click', deleteResolution);
    deleteResolutionBtn.addEventListener('click', () => deleteResolution());
  }
  if (ttlCheckbox) {
    ttlCheckbox.removeEventListener('change', changeTTL);
    ttlCheckbox.addEventListener('change', () => changeTTL());
  }
};

export default addListeners;
