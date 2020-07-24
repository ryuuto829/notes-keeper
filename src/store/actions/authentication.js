import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_UP_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_LOGOUT
} from '../actions/actionTypes';

export const authSignInRequest = (email, password) => ({
  type: AUTH_SIGN_IN_REQUEST,
  email,
  password
});

export const authSignUpRequest = (email, username, password) => ({
  type: AUTH_SIGN_UP_REQUEST,
  email,
  username,
  password
});

export const authSuccess = userData => ({
  type: AUTH_SUCCESS,
  userData
});

export const authFailure = errorMessages => ({
  type: AUTH_FAILURE,
  errorMessages
});

export const authLogout = () => ({
  type: AUTH_LOGOUT
});
