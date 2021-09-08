import {
  USER_LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_MESSAGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_MESSAGE,
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

export const login = (data) => async (dispatch) => {
  try {
    const user = await authService.authenticateUser(data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
  } catch (err) {
    const message = `${err.text}  (${err.message})`;
    dispatch({
      type: LOGIN_FAIL,
    });
    dispatch({
      type: SET_MESSAGE,
      payload: message,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};

export const clearErrors = () => ({
  type: CLEAR_MESSAGE,
});
