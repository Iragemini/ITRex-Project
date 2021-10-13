import {
  PATIENT_LOGOUT,
  DOCTOR_LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_MESSAGE,
  LOGIN_DOCTOR_FAIL,
  LOGIN_PATIENT_FAIL,
  LOGIN_DOCTOR_SUCCESS,
  LOGIN_PATIENT_SUCCESS,
  CLEAR_MESSAGE,
  CURRENT_USER,
} from './types.js';
import Roles from '../src/utils/roles.js';

const initialState = {};

const initialPatientState = { isPatientLoggedIn: false, user: null };

const initialDoctorState = { isDoctorLoggedIn: false, user: null };

const initialCurrentUserState = { currentUser: Roles.PATIENT };

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      return { ...state, message: payload };

    case CLEAR_MESSAGE:
      return { ...state, message: '' };

    default:
      return state;
  }
};

const patientReducer = (state = initialPatientState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isPatientLoggedIn: false,
        user: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isPatientLoggedIn: false,
      };
    case LOGIN_PATIENT_SUCCESS:
      return {
        ...state,
        isPatientLoggedIn: true,
        user: payload,
      };
    case LOGIN_PATIENT_FAIL:
      return {
        ...state,
        isPatientLoggedIn: false,
        user: null,
      };
    case PATIENT_LOGOUT:
      return {
        ...state,
        isPatientLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

const doctorReducer = (state = initialDoctorState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_DOCTOR_SUCCESS:
      return {
        ...state,
        isDoctorLoggedIn: true,
        user: payload,
      };
    case LOGIN_DOCTOR_FAIL:
      return {
        ...state,
        isDoctorLoggedIn: false,
        user: null,
      };
    case DOCTOR_LOGOUT:
      return {
        ...state,
        isDoctorLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

const userReducer = (state = initialCurrentUserState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};

/* eslint no-undef: 0 */
const reducer = Redux.combineReducers({
  messageReducer,
  patientReducer,
  doctorReducer,
  userReducer,
});

export default reducer;
