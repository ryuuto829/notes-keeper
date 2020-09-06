// @flow
import { all, call, put, takeEvery } from "redux-saga/effects";
import { type Saga } from "redux-saga";
import {
  firebase,
  auth,
  reAuthentication,
  changeDisplayName,
  changeEmail
} from "../../server/firebase";
import {
  deleteUserRequest,
  deleteUserFailure,
  updateUserRequest,
  updateUserFailure,
  updateUserSuccess
} from "../modules/settings";

export function* deleteUserSaga(action) {
  const { password } = action.payload;
  const user = auth.currentUser;

  try {
    yield user.reauthenticateWithCredential(
      firebase.auth.EmailAuthProvider.credential(user.email, password + "d")
    );
    yield user.delete();
  } catch (error) {
    yield put(deleteUserFailure({ error: "error" }));
  }
}

function* updateUserSaga(action) {
  const { password, name, email } = action.payload;
  const ERROR_MESSAGE = `some error`;

  const error = yield call([auth.currentUser, reAuthentication], password);

  if (error) {
    yield put(updateUserFailure({ error: ERROR_MESSAGE }));
  } else {
    let error = false;
    if (name) {
      const changeNameError = yield call(
        [auth.currentUser, changeDisplayName],
        name
      );
      if (changeNameError) error = true;
    }

    if (email) {
      const changeEmailError = yield call(
        [auth.currentUser, changeEmail],
        email
      );
      if (changeEmailError) error = true;
    }

    if (error) {
      yield put(updateUserFailure({ error: ERROR_MESSAGE }));
    } else {
      yield put(updateUserSuccess());
    }
  }
}

export default function* loginRootSaga(): Saga<void> {
  yield all([
    takeEvery(deleteUserRequest, deleteUserSaga),
    takeEvery(updateUserRequest, updateUserSaga)
  ]);
}
