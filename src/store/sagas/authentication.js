// @flow
import { put } from "redux-saga/effects";
import {
  signInWithEmail,
  createUser,
  updateUsername,
  logout,
  auth
} from "../../server/firebase";
import {
  saveToLocalStorage,
  clearLocalStorage
} from "../../utils/localStorage";
import { updateUserData, removeUserData } from "../modules/user";
import { success, failure } from "../modules/auth";
// import { type UserStore } from "../../types/stores";

const setUserData = user => ({
  displayName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  uid: user.uid,
  creationTime: user.metadata.creationTime,
  lastSignInTime: user.metadata.lastSignInTime
});

function* changeUserData(user) {
  const userData = {
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    uid: user.uid,
    creationTime: user.metadata.creationTime,
    lastSignInTime: user.metadata.lastSignInTime
  };

  yield saveToLocalStorage("user", userData);
  yield put(updateUserData({ user: userData }));
  yield put(success());
}

export function* signInSaga(action) {
  const { email, username, password } = action.payload;

  try {
    const { user } = yield signInWithEmail(email, password);
    yield changeUserData(user);
  } catch (error) {
    yield put(failure({ errorMessages: error.message }));
  }
}

export function* signUpSaga(action) {
  const { email, username, password } = action.payload;

  try {
    yield createUser(email, password);
    yield updateUsername(username);
    const user = yield auth.currentUser;
    yield changeUserData(user);
  } catch (error) {
    yield put(failure({ errorMessages: error.message }));
  }
}

export function* logoutSaga() {
  yield logout();
  yield put(removeUserData());
  yield clearLocalStorage("user");
}
