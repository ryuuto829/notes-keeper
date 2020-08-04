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

const setUserData = user => ({
  displayName: user.displayName,
  email: user.email,
  emailVerified: user.emailVerified,
  uid: user.uid,
  creationTime: user.metadata.creationTime,
  lastSignInTime: user.metadata.lastSignInTime
});

function* changeUserData() {
  const user = yield auth.currentUser;
  const userData = yield setUserData(user);

  yield saveToLocalStorage("user", userData);
  yield put(updateUserData({ user: user }));
  yield put(success());
}

export function* signInSaga(action) {
  const { email, password } = action.payload;

  try {
    yield signInWithEmail(email, password);
    yield changeUserData();
  } catch (error) {
    yield put(failure({ errorMessages: error.message }));
  }
}

export function* signUpSaga(action) {
  const { email, username, password } = action.payload;

  try {
    yield createUser(email, password);
    yield updateUsername(username);
    yield changeUserData();
  } catch (error) {
    yield put(failure({ errorMessages: error.message }));
  }
}

export function* logoutSaga() {
  yield clearLocalStorage("user");
  yield put(removeUserData());
  yield logout();
}
