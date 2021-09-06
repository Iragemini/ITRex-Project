import resolutionService from '../../http/resolution.service.js';
import queueService from '../../http/queue.service.js';
import store from '../../redux/store.js';
import { logout } from '../../redux/actions.js';

export const logoutUser = () => {
  localStorage.removeItem('reduxState');
  store.dispatch(logout());
};

export const makeAppointment = async () => {
  const reason = document.getElementById('reason');
  const data = { reason: reason.value };
  try {
    await queueService.postPatientInQueue(data);
    reason.value = '';
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
