// @flow
import { all, call, put, takeEvery } from "redux-saga/effects";
import { type Saga } from "redux-saga";
import {
  auth,
  reAuthentication,
  deleteAccount,
  changeDisplayName
} from "../../server/firebase";
import {
  deleteUserRequest,
  deleteUserFailure,
  updateUserRequest,
  updateUserFailure,
  updateUserSuccess
} from "../modules/settings";
import { logoutRequest } from "../modules/login";

function* deleteUserSaga(action) {
  const { password } = action.payload;
  const ERROR_MESSAGE = `some error`;

  const error = yield call([auth.currentUser, reAuthentication], password);

  if (error) {
    yield put(deleteUserFailure({ error: ERROR_MESSAGE }));
  } else {
    const error = yield call([auth.currentUser, deleteAccount]);

    if (error) {
      yield put(deleteUserFailure({ error: ERROR_MESSAGE }));
    } else {
      yield put(logoutRequest());
    }
  }
}

function* updateUserSaga(action) {
  const { password, name, email } = action.payload;
  const ERROR_MESSAGE = `some error`;

  const error = yield call([auth.currentUser, reAuthentication], password);

  if (error) {
    yield put(updateUserFailure({ error: ERROR_MESSAGE }));
  } else {
    const error = yield call([auth.currentUser, changeDisplayName], name);

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
