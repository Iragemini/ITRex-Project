import resolutionForm from '../resolution/resolutionForm.js';
import loginForm from '../auth/login.js';

const doctorPage = (isAuth) => {
  if (isAuth) {
    return resolutionForm();
  }
  return loginForm('doctor');
};

export default doctorPage;
