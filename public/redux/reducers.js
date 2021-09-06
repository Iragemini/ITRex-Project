import {
  USER_LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_MESSAGE,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_MESSAGE,
} from './types.js';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {};

const initialUserState = user ? { isLoggedIn: true, user } : { isLoggedIn: false, user: null };

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

const userReducer = (state = initialUserState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        user: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

/* eslint no-undef: 0 */
const reducer = Redux.combineReducers({
  messageReducer,
  userReducer,
});

export default reducer;
