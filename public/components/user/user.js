import loginForm from '../auth/login.js';
import signupForm from '../auth/signup.js';
import accountForm from '../account/accountForm.js';
import Roles from '../../src/utils/roles.js';
import doctorPage from '../doctor/doctor.js';

const changeForm = (state) => {
  const { currentUser } = state.userReducer;
  const loginTab = document.getElementById('login-tab');
  loginTab.innerHTML = 'Log in';

  if (currentUser && +currentUser === Roles.DOCTOR) {
    return doctorPage(state.doctorReducer.isDoctorLoggedIn);
  }
  if (state.patientReducer.isPatientLoggedIn) {
    loginTab.innerHTML = state.patientReducer.user.data.name;
    return accountForm(state.patientReducer.user.data);
  }
  if (state.patientReducer.user) {
    return loginForm('patient');
  }

  return signupForm();
};

export default changeForm;
