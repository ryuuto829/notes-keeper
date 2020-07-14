import {
  SUBMIT_SIGN_IN_FORM,
  SUBMIT_SIGN_UP_FORM,
  REQUEST_USER_AUTH_DATA
} from '../actions/actionTypes';

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
