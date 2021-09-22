import store from '../../redux/store.js';
import Roles from '../../src/utils/roles.js';

const getToken = () => {
  const state = store.getState();
  let user;
  const { currentUser } = state.userReducer;
  if (!currentUser) {
    return '';
  }
  if (+currentUser === Roles.PATIENT) {
    user = state.patientReducer.user;
  }
  if (+currentUser === Roles.DOCTOR) {
    user = state.doctorReducer.user;
  }
  if (typeof user !== 'object' || !user.token) {
    return '';
  }
  return `Bearer ${user.token}`;
};

export default getToken;
