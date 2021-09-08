import { render } from './utils/render.js';
import store from '../redux/store.js';
import { clearErrors } from '../redux/actions.js';
import initMenu from './utils/initMenu.js';
import addListeners from './utils/addListeners.js';

const clearError = document.getElementById('clearError');

clearError.onclick = () => {
  store.dispatch(clearErrors());
};

window.onload = () => {
  const state = store.getState();
  render(state);
  initMenu();
  addListeners();
};
