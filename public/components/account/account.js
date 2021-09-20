import resolutionService from '../../http/resolution.service.js';
import queueService from '../../http/queue.service.js';
import doctorService from '../../http/doctor.service.js';
import store from '../../redux/store.js';
import { logout } from '../../redux/actions.js';
import Roles from '../../src/utils/roles.js';

export const logoutUser = () => {
  // localStorage.removeItem('reduxState');
  store.dispatch(logout(Roles.PATIENT));
};

export const makeAppointment = async () => {
  const doctors = document.getElementById('doctors');
  const selectedOption = doctors.options.selectedIndex;
  const doctorId = doctors.options[selectedOption].value;
  console.log('makeAppointment doctorId', doctorId);
  try {
    await queueService.postPatientInQueue(doctorId);
  } catch (e) {
    console.log(e.text, e.message);
  }
};

export const showResolution = async () => {
  const userResolution = document.getElementById('userResolution');
  userResolution.value = '';
  try {
    const { resolution } = await resolutionService.getUserResolution();
    if (resolution) {
      userResolution.value = resolution;
    }
  } catch (e) {
    console.log(e.text);
    userResolution.value = e.message;
  }
};

export const getDoctorsList = async (doctorSelect) => {
  try {
    const { data } = await doctorService.getDoctors();

    data.forEach((item) => {
      let option = document.createElement('option');
      option.value = item.id;
      option.innerHTML = `${item.name} - ${item.specialization}`;
      doctorSelect.appendChild(option);
    });
  } catch (e) {
    console.log(e.text, e.message);
  }
};
