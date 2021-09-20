import { signin, signup, doctorSignin } from './auth.js';
import { getPatientId, submitResolution, dequeue } from './processPatient.js';
import { deleteResolution } from './deleteResolution.js';
import { getIntoQueue } from './getIntoQueue.js';
import get from './get/getDataFromApi.js'

axios.interceptors.request.use(function (config) {
  let token;

  try {
    token = localStorage.getItem('token');
  } catch (e) {
    token = undefined;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const submitResolutionForm = document.getElementById('form-submit-resolution');
const nextPatientButton = document.getElementById('btn-next-patient');
const deleteResolutionButtons = document.getElementsByClassName('btn-delete-resolution');
const doctorSigninForm = document.getElementById('doctor-signin-form');
const doctorSelectDiv = document.getElementById('doctor-select-div');
const doctorNameDiv = document.getElementById('doctor-name');
const currentPatientDiv = document.getElementById('current-patient');
const navbarNav = document.getElementById('auth-navbar-nav');
const navbarForm = document.getElementById('auth-navbar-form');
const processPatientDiv = document.getElementById('process-current-name');
const processDoctorDiv = document.getElementById('process-doctor-name');
const getIntoQueueDiv = document.getElementById('get-into-queue-div'); 
const personalResolutionsDiv = document.getElementById('personal-resolutions-list');
const searchResolutionsDiv = document.getElementById('search-resolutions-list')
const searchResolutionsByNameForm = document.getElementById('resolutions-search-form');

let isSignedIn, me;

const checkIfSignedIn = async () => {
  try {
    localStorage.getItem('token');
    const user = await get.personalUserProfile();
    me = user.data.data;
    isSignedIn = true;
  } catch (e) {
    console.log(e);
    isSignedIn = false;
  }

  if (isSignedIn) {
    if (me['roles.title'] === 'patient') {
      navbarNav.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="/personal-resolutions">Personal Resolutions</a></li>
      `;

      const signoutButton = document.createElement('a');
      signoutButton.className = 'btn btn-outline-light m-1';
      signoutButton.innerHTML = 'Sign out';

      signoutButton.addEventListener('click', async () => {
        localStorage.removeItem('token');
        location.assign('/');
      });

      navbarForm.append(signoutButton);

    } else if (me['roles.title'] === 'doctor') {
      navbarNav.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="/process">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="/resolutions">Search Resolutions</a></li>
      `;

      const signoutButton = document.createElement('a');
      signoutButton.className = 'btn btn-outline-light m-1';
      signoutButton.innerHTML = 'Sign out';

      signoutButton.addEventListener('click', async () => {
        localStorage.removeItem('token');
        location.assign('/');
      });

      navbarForm.append(signoutButton);
    }
  } else {
    navbarNav.innerHTML = `
    <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
    `;

    navbarForm.innerHTML = `
    <ul class="navbar-nav me-auto">
      <li class="nav-item">
        <a class="nav-link m-1" href="/docsignin">[doctor page]</a>
      </li>
      <span class="navbar-text mx-2"></span>
      <span class="navbar-text mx-2"></span>
    </ul>
    <ul class="navbar-nav me-auto">
      <li class="nav-item"><a class="nav-link m-1" href="/signin">Sign in</a></li>
    </ul>
    <a class="btn btn-outline-light m-1" href="/signup">Sign up</a>
    `;
  }
}

await checkIfSignedIn();

if (searchResolutionsByNameForm) {
  searchResolutionsByNameForm.addEventListener('submit', async event => {
    event.preventDefault();

    const patientName = searchResolutionsByNameForm.querySelector('#name').value;
    const resolutions = await get.resolutionsByName(patientName);

    const resolutionsArray = resolutions.data.data;

    if (resolutionsArray.length !== 0) {
      searchResolutionsDiv.innerHTML = '';

      resolutionsArray.forEach(el => {
        const listGroup = document.createElement('div');
        listGroup.className = 'list-group-item py-3'

        const patientID = document.createElement('small');
        patientID.innerHTML = `PatientID: ${el.patient_id}`;
        listGroup.append(patientID)

        const doctorInfo = document.createElement('p');
        doctorInfo.className = 'mb-1';
        doctorInfo.innerHTML = `Submitted by ${el.doctor_name}, ${el.doctor_specialization}`;
        listGroup.append(doctorInfo)

        const resolution = document.createElement('p');
        resolution.className = 'mb-1';
        resolution.innerHTML = el.resolution;
        listGroup.append(resolution)

        const created = document.createElement('small');
        const date = el.created_at.toLocaleString('en-us');
        created.innerHTML = date;
        listGroup.append(created)

        const deleteButton = document.createElement('a');
        deleteButton.className = 'btn btn-dark m-1 btn-delete-resolution';
        deleteButton.innerHTML = 'Delete resolution';
        deleteButton.addEventListener('click', async () => {
          await deleteResolution(el.id);
        });
        listGroup.append(deleteButton)

        searchResolutionsDiv.append(listGroup);
      })
    } else {
      searchResolutionsDiv.innerHTML= '<small class="p-3 m-2">No resolutions to show.</small>'
    }
  });
}

if (personalResolutionsDiv) {
  const resolutions = await get.personalResolutions();

  const resolutionsArray = resolutions.data.data;

  if (resolutionsArray.length !== 0) {
    resolutionsArray.forEach(el => {
      const listGroup = document.createElement('div');
      listGroup.className = 'list-group-item py-3'
      const createdAt = el.created_at.toLocaleString('en-us');
      listGroup.innerHTML = `
      <p class="mb-1">Submitted by ${el.doctor_name} (${el.doctor_specialization})</p>
      <p class="mb-1">${el.resolution}</p>
      <small>${createdAt}</small>
      `;

      personalResolutionsDiv.append(listGroup);
    })
  } else {
    personalResolutionsDiv.innerHTML= '<small>You do not have any resolutions.</small>'
  }
}

if (processDoctorDiv && processPatientDiv) {
  const doctor = await get.doctorByUserId();

  processDoctorDiv.innerHTML = doctor.data.data.name;

  const patient = await getPatientId();

  if (patient.data.current) {
    processPatientDiv.innerHTML = patient.data.current.name;
  }
}

if (submitResolutionForm) {
  submitResolutionForm.addEventListener('submit', async event => {
    event.preventDefault();

    const patient = await getPatientId();

    const patientId = patient.data.current.id;
    const resolution = document.getElementById('doctor-new-resolution').value;
    const ttl = document.getElementById('timeToLive').value;

    if (resolution) {
      await submitResolution(patientId, resolution, ttl);
    }
  });
}

if (nextPatientButton) {
  nextPatientButton.addEventListener('click', async () => {
    await dequeue();
    location.reload(true);
  });
}

if (doctorNameDiv && currentPatientDiv) {
  const windowhref = window.location.href;
  const hrefArray = windowhref.split('/')
  const doctorId = hrefArray[hrefArray.length - 1].replace('doctor-', '').replace('#', '');

  const doctor = await get.doctorById(doctorId);

  doctorNameDiv.innerHTML = doctor.data.data.name;

  const patient = await get.patientFromQueue(doctorId);

  if (!patient) {
    currentPatientDiv.innerHTML = 'empty';
  } else {
    currentPatientDiv.innerHTML = patient.data.current.name;
  }

  if (isSignedIn && me['roles.title'] === 'patient') {
    const getIntoQueueButton = document.createElement('a');
    getIntoQueueButton.className = 'btn btn-dark m-1';
    getIntoQueueButton.id = 'btn-get-into-queue';
    getIntoQueueButton.innerHTML = 'Get into queue';

    getIntoQueueButton.addEventListener('click', async () => {
      await getIntoQueue();
    });

    getIntoQueueDiv.append(getIntoQueueButton);
  }
}

if (doctorSelectDiv) {
  const doctors = await get.allAvailableDoctors();
  const doctorsArray = doctors.data.data;

  if (doctorsArray.length === 0) {
    doctorSelectDiv.innerHTML = '<small>There are no doctors online.</small>'
  } else {
    const table = document.createElement('table');
    table.className = 'table';
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    if (isSignedIn) {
      thead.innerHTML = `
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Specialization</th>
        <th scope="col">Queue Link</th>
      </tr>
      `
    } else {
      thead.innerHTML = `
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Specialization</th>
      </tr>
      `
    }

    table.append(thead);

    doctorsArray.forEach(el => {
      const trow = document.createElement('tr');

      if (isSignedIn) {
        trow.innerHTML = `
          <th scope="row">${el.id}</th>
          <td>${el.name}</td>
          <td>${el['specializations.title']}</td>
          <td><a href="/doctor-${el.id}">link</a></td>
        `
      } else {
        trow.innerHTML = `
          <th scope="row">${el.id}</th>
          <td>${el.name}</td>
          <td>${el['specializations.title']}</td>
        `
      }

      tbody.append(trow);
    })

    table.append(tbody);
    doctorSelectDiv.append(table);
    }
}

if (signinForm) {
  signinForm.addEventListener('submit', async event => {
    event.preventDefault();

    const email = signinForm.querySelector('#inputEmail').value;
    const password = signinForm.querySelector('#inputPassword').value;

    await signin(email, password);
  });
}

if (doctorSigninForm) {
  doctorSigninForm.addEventListener('submit', async event => {
    event.preventDefault();

    const email = doctorSigninForm.querySelector('#inputEmail').value;
    const password = doctorSigninForm.querySelector('#inputPassword').value;

    await doctorSignin(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', async event => {
    event.preventDefault();

    const name = signupForm.querySelector('#inputName').value;
    const email = signupForm.querySelector('#inputEmail').value;
    const password = signupForm.querySelector('#inputPassword').value;
    const passwordConfirm = signupForm.querySelector(
      '#inputPasswordConfirm',
    ).value;
    const gender = signupForm.querySelector('#inputGender').value;
    const birthDate = signupForm.querySelector('#inputBirthday').value;

    await signup(name, email, password, passwordConfirm, gender, birthDate);
  });
}
