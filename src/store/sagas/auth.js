import { put } from 'redux-saga/effects';
import {
  authSuccess,
  authFailure
} from '../actions';
import {
  validateLoginForm,
  validateRegisterForm,
} from '../../utils';
import { signInWithEmail } from '../../server/firebase';

export function* signInSaga({ email, password }) {
  /** Form validation */
  const errors = validateLoginForm(email, password);

  if (Object.keys(errors).length !== 0) {
    yield put(authFailure(errors));
    return;
  }

  /** Fetch user data from firebase */
  try {
    const user = yield signInWithEmail(email, password);
    yield put(authSuccess(user));

  } catch (error) {
    yield put(authFailure({
      email: error.message,
      password: error.message
    }));
  }
};

export function* signUpSaga({ email, username, password }) {
  /** Form validation */
  const errors = validateRegisterForm(email, username, password);

  if (Object.keys(errors).length !== 0) {
    yield put(authFailure(errors));
    return;
  }

  /** Fetch user data from firebase */
  try {
    const user = yield signInWithEmail(email, password);
    yield put(authSuccess(user));

  } catch (error) {
    yield put(authFailure({
      email: error.message,
      username: error.message,
      password: error.message
    }));
  }
};
