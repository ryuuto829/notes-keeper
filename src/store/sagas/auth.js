import { put } from 'redux-saga/effects';
import { authSuccess, authFailure } from '../actions';
import { validateLoginForm, validateRegisterForm, } from '../../utils';
import {
  signInWithEmail,
  createUser,
  updateUsername,
  logout
} from '../../server/firebase';
import { saveToLocalStorage, clearLocalStorage } from '../../utils/localStorage';

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
    yield saveToLocalStorage('user', user);
    yield put(authSuccess(user));

  } catch (error) {
    yield put(authFailure({
      email: error.message,
      password: error.message
    }));
  }
};

export function* signUpSaga({ email, username, password }) {
  yield logout();
  /** Form validation */
  const errors = validateRegisterForm(email, username, password);

  if (Object.keys(errors).length !== 0) {
    yield put(authFailure(errors));
    return;
  }

  /** Fetch user data from firebase */
  try {
    yield createUser(email, password);
    const user = yield updateUsername(username);
    yield saveToLocalStorage('user', user);
    yield put(authSuccess(user));

  } catch (error) {
    yield put(authFailure({
      email: error.message,
      username: error.message,
      password: error.message
    }));
  }
};

export function* logoutSaga() {
  yield clearLocalStorage('user');
  yield logout();
};
