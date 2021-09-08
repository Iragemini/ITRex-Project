import loginForm from '../auth/login.js';
import signupForm from '../auth/signup.js';
import accountForm from '../account/accountForm.js';

const changeForm = (state) => {
  if (state.userReducer.isLoggedIn) {
    return accountForm(state.userReducer.user);
  }
  if (state.userReducer.user) {
    const { user } = state.userReducer;
    return loginForm(user);
  }

  return signupForm();
};

export default changeForm;
