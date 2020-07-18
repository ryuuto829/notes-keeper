import {
  SUBMIT_SIGN_IN_FORM,
  SUBMIT_SIGN_UP_FORM,
  REQUEST_USER_AUTH_DATA
} from '../actions/actionTypes';
import { formValidation } from '../../utils/validation';
import { signInWithEmail } from '../../server/firebase';

const initialState = {
  errorMessages: {}
};

const checkInputsValidity = inputs => {
  const errors = {};

  inputs.forEach(({ name, text }) => {
    const inputError = formValidation(text, name) || null;
    if (inputError) errors[name] = inputError;
  })

  return errors;
};

const submitSignInForm = (state, { email, password }) => {
  const errors = checkInputsValidity([
    { name: 'email', text: email },
    { name: 'password', text: password }
  ]);

  if (Object.keys(errors).length === 0) {
    signInWithEmail(email, password);

    return {
      ...state,
      errorMessages: {}
    };
  }

  return {
    ...state,
    errorMessages: {
      ...errors
    }
  };
};

const submitSignUPForm = (state, { email, username, password }) => {
  const errors = checkInputsValidity([
    { name: 'email', text: email },
    { name: 'username', text: username },
    { name: 'password', text: password },
  ]);

  if (Object.keys(errors).length === 0) {
    /** send register form to the server */
    console.log('submit to the server');
    return {
      ...state,
      errorMessages: {}
    };
  }

  return {
    ...state,
    errorMessages: {
      ...errors
    }
  };
};

const requestUserAuthData = (state, { userData }) => ({
  ...state,
  ...userData
});

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_SIGN_IN_FORM: return submitSignInForm(state, action);
    case SUBMIT_SIGN_UP_FORM: return submitSignUPForm(state, action);
    case REQUEST_USER_AUTH_DATA: return requestUserAuthData(state, action);
    default:
      return state;
  }
};

export default authentication;
