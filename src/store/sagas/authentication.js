import { put } from 'redux-saga/effects';
import { authSuccess, authFailure } from '../actions';
import { validateLoginForm, validateRegisterForm, } from '../../utils';
import {
  signInWithEmail,
  createUser,
  updateUsername,
  logout,
  auth
} from '../../server/firebase';
import { saveToLocalStorage, clearLocalStorage } from '../../utils/localStorage';

const setUserData = user => ({
  displayName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  uid: user.uid,
  creationTime: user.metadata.creationTime,
  lastSignInTime: user.metadata.lastSignInTime,
});

function* updateUserData() {
  const user = yield auth.currentUser;
  const userData = yield setUserData(user);

  yield saveToLocalStorage('user', userData);
  yield put(authSuccess(userData));
};

export function* signInSaga({ email, password }) {
  /** Form validation */
  const errors = validateLoginForm(email, password);

  if (Object.keys(errors).length !== 0) {
    yield put(authFailure(errors));
    return;
  }

  /** Fetch user data from firebase */
  try {
    yield signInWithEmail(email, password);
    yield updateUserData();

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
    yield createUser(email, password);
    yield updateUsername(username);
    yield updateUserData();

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
