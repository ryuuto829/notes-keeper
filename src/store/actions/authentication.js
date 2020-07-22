import {
  SUBMIT_SIGN_IN_FORM,
  SUBMIT_SIGN_UP_FORM,
  REQUEST_USER_AUTH_DATA,

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


export const submitSignInForm = (email, password) => ({
  type: SUBMIT_SIGN_IN_FORM,
  email,
  password
});

export const submitSignUpForm = (email, username, password) => ({
  type: SUBMIT_SIGN_UP_FORM,
  email,
  username,
  password
});

export const requestUserAuthData = userData => ({
  type: REQUEST_USER_AUTH_DATA,
  userData
});
