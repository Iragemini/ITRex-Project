import {
  PATIENT_LOGOUT,
  DOCTOR_LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_MESSAGE,
  LOGIN_DOCTOR_FAIL,
  LOGIN_DOCTOR_SUCCESS,
  LOGIN_PATIENT_FAIL,
  LOGIN_PATIENT_SUCCESS,
  CLEAR_MESSAGE,
  CURRENT_USER,
} from './types.js';
import authService from '../http/auth.service.js';

export const register = (data) => async (dispatch) => {
  try {
    await authService.registerUser(data);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.name,
    });
  } catch (err) {
    const message = `${err.text}  (${err.message})`;
    dispatch({
      type: REGISTER_FAIL,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
  }
};

export const login = (data, role) => async (dispatch) => {
  console.log('role', role, data);
  const SUCCESS = +role === 1 ? LOGIN_PATIENT_SUCCESS : LOGIN_DOCTOR_SUCCESS;
  const FAIL = +role === 1 ? LOGIN_PATIENT_FAIL : LOGIN_DOCTOR_FAIL;

  console.log('login', SUCCESS, FAIL);
  try {
    const user = await authService.authenticateUser(data);
    dispatch({
      type: SUCCESS,
      payload: user,
    });
  } catch (err) {
    const message = `${err.text}  (${err.message})`;
    dispatch({
      type: FAIL,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
  }
};

export const logout = (role) => (dispatch) => {
  const LOGOUT = +role === 1 ? PATIENT_LOGOUT : DOCTOR_LOGOUT;
  dispatch({
    type: LOGOUT,
  });
};

export const clearErrors = () => ({
  type: CLEAR_MESSAGE,
});

export const setCurrentUser = (role) => ({
  type: CURRENT_USER,
  payload: role,
});
