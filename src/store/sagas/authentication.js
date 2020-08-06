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
import { updateUser, removeUser } from "../modules/user";
import {
  signSuccess,
  signFailure,
  setAuthenticated,
  authSuccess,
  authFailure
} from "../modules/auth";
import { type UserStore } from "../../types/stores";

// function* changeUserData(user) {
//   const userData = {
//     displayName: user.displayName,
//     email: user.email,
//     emailVerified: user.emailVerified,
//     uid: user.uid,
//     creationTime: user.metadata.creationTime,
//     lastSignInTime: user.metadata.lastSignInTime
//   };

//   yield saveToLocalStorage("user", userData);
// }

export function* signInSaga(action) {
  const { email, username, password } = action.payload;

  try {
    yield signInWithEmail(email, password);
    yield put(signSuccess());
  } catch (error) {
    yield put(signFailure({ errorMessages: error.message }));
  }
}

export function* signUpSaga(action) {
  const { email, username, password } = action.payload;

  try {
    yield createUser(email, password);
    yield updateUsername(username);
    yield put(signSuccess());
  } catch (error) {
    yield put(signFailure({ errorMessages: error.message }));
  }
}

export function* logoutSaga() {
  yield logout();
  yield put(removeUser());
  yield clearLocalStorage("user");
}

export function* getUserData(action) {
  const { user } = action.payload;
  // const userData = {
  //   displayName: user.displayName,
  //   email: user.email,
  //   emailVerified: user.emailVerified,
  //   uid: user.uid
  //   // creationTime: user.metadata.creationTime,
  //   // lastSignInTime: user.metadata.lastSignInTime
  // };

  if (user) {
    yield saveToLocalStorage("user", user);
    yield put(updateUser({ user: user }));
    yield put(authSuccess());
  } else {
    yield put(authFailure());
  }
}
