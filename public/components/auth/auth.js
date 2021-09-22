import store from '../../redux/store.js';
import { login, register } from '../../redux/actions.js';

export const loginUser = () => {
  const state = store.getState();
  const loginEmail = document.querySelector('.login__email');
  const loginPassword = document.querySelector('.login__psw');
  const data = { email: loginEmail.value, password: loginPassword.value };
  store.dispatch(login(data, state.userReducer.currentUser));
};

export const signupUser = () => {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const gender = document.getElementById('gender');
  const birthDate = document.getElementById('birthDate');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');

  const clearForm = () => {
    name.value = '';
    email.value = '';
    gender.value = '';
    birthDate.value = '';
    password.value = '';
    confirmPassword.value = '';
  };

  const data = {
    name: name.value,
    email: email.value,
    gender: gender.value,
    birthDate: birthDate.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };
  clearForm();
  store.dispatch(register(data));
};
