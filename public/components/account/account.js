import resolutionService from '../../http/resolution.service.js';
import queueService from '../../http/queue.service.js';
import doctorService from '../../http/doctor.service.js';
import store from '../../redux/store.js';
import { logout } from '../../redux/actions.js';
import Roles from '../../src/utils/roles.js';
import createTable from '../resolution/resolutionsTable.js';

export const logoutUser = () => {
  let user = Roles.PATIENT;
  const state = store.getState();
  if (state.userReducer.currentUser) {
    user = state.userReducer.currentUser;
  }
  store.dispatch(logout(user));
};

export const makeAppointment = async () => {
  const doctorSelect = document.getElementById('doctorSelect');
  const selectedOption = doctorSelect.options.selectedIndex;
  const doctorId = doctorSelect.options[selectedOption].value;
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
    const { data } = await resolutionService.getUserResolutions();
    if (data) {
      createTable(userResolution, data, Roles.PATIENT);
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
