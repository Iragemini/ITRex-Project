import changeForm from '../../components/user/user.js';

const main = document.querySelector('.main');

const errDiv = document.getElementById('errorDiv');
const errorMessage = document.getElementById('errorMessage');

const renderMain = (html) => {
  main.innerHTML = '';
  main.innerHTML = html;
};

export const render = (state) => {
  errDiv.classList.add('error__field');
  if (state.messageReducer.message) {
    errDiv.classList.remove('error__field');
    errorMessage.innerText = state.messageReducer.message;
  }
  renderMain(changeForm(state));
};

export default renderMain;
