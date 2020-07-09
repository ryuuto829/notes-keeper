import {
  SUBMIT_SIGN_IN_FORM,
  SUBMIT_SIGN_UP_FORM
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
