import accountForm from '../../components/account/accountForm.js';
import loginForm from '../../components/auth/login.js';
import signupForm from '../../components/auth/signup.js';
import doctorPage from '../../components/doctor/doctor.js';
import addListeners from './addListeners.js';
import renderMain from './render.js';
import store from '../../redux/store.js';
import setCurrentPatient from './setCurrentPatient.js';

const initMenu = () => {
  menu.addEventListener('click', (e) => {
    const state = store.getState();
    const { isLoggedIn } = state.userReducer;
    const menu = document.querySelector('#menu');
    const elem = e.target;
    if (elem.type !== 'button') {
      return;
    }
    const tab = elem.id;
    switch (tab) {
      case 'signup-tab':
        if (isLoggedIn) {
          renderMain('<div class="container"><p>You are already registered</p></div>');
        } else {
          renderMain(signupForm());
        }
        break;
      case 'login-tab':
        if (isLoggedIn) {
          renderMain(accountForm(state.userReducer.user));
        } else {
          renderMain(loginForm(state.userReducer.user));
        }
        break;
      case 'doctor-tab':
        renderMain(doctorPage());
        setCurrentPatient();
        break;
      default:
        renderMain(signupForm());
    }
    addListeners();
  });
};

export default initMenu;
