import { put } from 'redux-saga/effects';
import { validateLoginForm, validateRegisterForm, } from '../../utils';
import {
  signInWithEmail,
  createUser,
  updateUsername,
  logout,
  auth
} from '../../server/firebase';
import {
  saveToLocalStorage,
  clearLocalStorage
} from '../../utils/localStorage';
import { updateUserData, removeUserData } from '../reducers/user';
import { success, failure } from '../reducers/auth';

const setUserData = user => ({
  displayName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  uid: user.uid,
  creationTime: user.metadata.creationTime,
  lastSignInTime: user.metadata.lastSignInTime,
});

function* changeUserData() {
  const user = yield auth.currentUser;
  const userData = yield setUserData(user);

  yield saveToLocalStorage('user', userData);
  yield put(updateUserData({ user: user }));
  yield put(success());
};

export function* signInSaga(action) {
  const { email, password } = action.payload;
  /** Form validation */
  const errors = validateLoginForm(email, password);

  if (Object.keys(errors).length !== 0) {
    yield put(failure({ errorMessages: errors }));
    return;
  }

  /** Fetch user data from firebase */
  try {
    yield signInWithEmail(email, password);
    yield changeUserData();

  } catch (error) {
    yield put(failure({
      errorMessages: {
        email: error.message,
        password: error.message
      }
    }));
  }
};

export function* signUpSaga(action) {
  const { email, username, password } = action.payload;
  /** Form validation */
  const errors = validateRegisterForm(email, username, password);

  if (Object.keys(errors).length !== 0) {
    yield put(failure({ errorMessages: errors }));
    return;
  }

  /** Fetch user data from firebase */
  try {
    yield createUser(email, password);
    yield updateUsername(username);
    yield changeUserData();

  } catch (error) {
    yield put(failure({
      errorMessages: {
        email: error.message,
        username: error.message,
        password: error.message
      }
    }));
  }
};

export function* logoutSaga() {
  yield clearLocalStorage('user');
  yield put(removeUserData());
  yield logout();
};
