/* eslint-disable */

import { signin, signup, signout, doctorSignin } from './auth.js';
import { getPatientId, submitResolution, dequeue } from './processPatient.js';
import { deleteResolution } from './deleteResolution.js';
import { getIntoQueue } from './getIntoQueue.js';
import searchResolutionsByName from './searchResolutionsByName.js';

const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const signoutButton = document.getElementById('btn-signout');
const submitResolutionForm = document.getElementById('form-submit-resolution');
const nextPatientButton = document.getElementById('btn-next-patient');
const getIntoQueueButton = document.getElementById('btn-get-into-queue');
const searchResolutionsByNameForm = document.getElementById(
  'form-search-resolutions-by-name',
);

const deleteResolutionButtons = document.getElementsByClassName('btn-delete-resolution');

const doctorSigninForm = document.getElementById('doctor-signin-form');

if (signinForm) {
  signinForm.addEventListener('submit', event => {
    event.preventDefault();

    const email = signinForm.querySelector('#inputEmail').value;
    const password = signinForm.querySelector('#inputPassword').value;

    signin(email, password);
  });
}

if (doctorSigninForm) {
  doctorSigninForm.addEventListener('submit', event => {
    event.preventDefault();

    const email = doctorSigninForm.querySelector('#inputEmail').value;
    const password = doctorSigninForm.querySelector('#inputPassword').value;

    doctorSignin(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', event => {
    event.preventDefault();

    // add birthday, gender
    const name = signupForm.querySelector('#inputName').value;
    const email = signupForm.querySelector('#inputEmail').value;
    const password = signupForm.querySelector('#inputPassword').value;
    const passwordConfirm = signupForm.querySelector(
      '#inputPasswordConfirm',
    ).value;
    const gender = signupForm.querySelector('#inputGender').value;
    const birthDate = signupForm.querySelector('#inputBirthday').value;

    signup(name, email, password, passwordConfirm, gender, birthDate);
  });
}

if (signoutButton) {
  signoutButton.addEventListener('click', () => {
    signout();
  });
}

if (submitResolutionForm) {
  submitResolutionForm.addEventListener('submit', async event => {
    event.preventDefault();

    const patient = await getPatientId();
    const patientId = patient.data.current.id;
    const resolution = document.getElementById('doctor-new-resolution').value;
    const ttl = document.getElementById('timeToLive').value;

    if (resolution) {
      submitResolution(patientId, resolution, ttl);
    }
  });
}

if (nextPatientButton) {
  nextPatientButton.addEventListener('click', () => {
    dequeue();
    location.reload(true);
  });
}

if (getIntoQueueButton) {
  getIntoQueueButton.addEventListener('click', () => {
    getIntoQueue();
  });
}

if (searchResolutionsByNameForm) {
  searchResolutionsByNameForm.addEventListener('submit', event => {
    event.preventDefault();

    const name = searchResolutionsByNameForm.querySelector('#name').value;

    searchResolutionsByName(name);
  });
}

if (deleteResolutionButtons) {

  const array = Array.from(deleteResolutionButtons);

  array.forEach(element => {
    element.addEventListener('click', () => {
      const id = element.id;
      const resolutionId = id.replace('delete-button-', '');
      deleteResolution(resolutionId);
    });
  });
}