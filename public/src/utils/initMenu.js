import accountForm from '../../components/account/accountForm.js';
import loginForm from '../../components/auth/login.js';
import signupForm from '../../components/auth/signup.js';
import doctorPage from '../../components/doctor/doctor.js';
import addListeners from './addListeners.js';
import renderMain from './render.js';
import store from '../../redux/store.js';
import setCurrentPatient from './setCurrentPatient.js';
import { setCurrentUser } from '../../redux/actions.js';
import Roles from './roles.js';

const initMenu = () => {
  const menu = document.querySelector('#menu');
  menu.addEventListener('click', (e) => {
    const state = store.getState();
    const { isPatientLoggedIn } = state.patientReducer;
    const { isDoctorLoggedIn } = state.doctorReducer;
    const elem = e.target;
    if (elem.type !== 'button') {
      return;
    }
    const tab = elem.id;
    switch (tab) {
      case 'signup-tab':
        store.dispatch(setCurrentUser(Roles.PATIENT));
        if (isPatientLoggedIn) {
          renderMain('<div class="container"><p>You are already registered</p></div>');
        } else {
          renderMain(signupForm());
        }
        break;
      case 'login-tab':
        store.dispatch(setCurrentUser(Roles.PATIENT));
        if (isPatientLoggedIn) {
          renderMain(accountForm(state.patientReducer.user.data));
        } else {
          renderMain(loginForm('patient'));
        }
        break;
      case 'doctor-tab':
        store.dispatch(setCurrentUser(Roles.DOCTOR));
        renderMain(doctorPage(isDoctorLoggedIn));
        if (isDoctorLoggedIn) {
          setCurrentPatient();
        }
        break;
      default:
        renderMain(signupForm());
    }
    addListeners();
  });
};

export default initMenu;
