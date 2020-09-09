// @flow
import { all, put, takeEvery } from "redux-saga/effects";
import { type Saga } from "redux-saga";
import { firebase, auth } from "../../server/firebase";
import {
  deleteUserRequest,
  deleteUserFailure,
  deleteUserSuccess,
  updateUserRequest,
  updateUserFailure,
  updateUserSuccess
} from "../modules/settings";

export function* deleteUserSaga(action) {
  const { password } = action.payload;
  const user = auth.currentUser;

  try {
    // Reauthenticate user
    yield user.reauthenticateWithCredential(
      firebase.auth.EmailAuthProvider.credential(user.email, password)
    );
    // Delete user will triger auth watcher and then logout
    yield user.delete();
    yield put(deleteUserSuccess());
  } catch (error) {
    yield put(deleteUserFailure({ error: "error" }));
  }
}

export function* updateUserSaga(action) {
  const { password, name, email, newPassword } = action.payload;
  const user = auth.currentUser;

  try {
    // Reauthenticate user
    yield user.reauthenticateWithCredential(
      firebase.auth.EmailAuthProvider.credential(user.email, password)
    );
  } catch (error) {
    yield put(updateUserFailure({ error: "error" }));
    return;
  }

  if (name) {
    try {
      // Update display name when it's new
      yield user.updateProfile({
        displayName: name
      });
    } catch (error) {
      yield put(updateUserFailure({ error: "error" }));
      return;
    }
  }

  if (email) {
    try {
      // Update email when it's new
      yield user.updateEmail(email);
    } catch (error) {
      yield put(updateUserFailure({ error: "error" }));
      return;
    }
  }

  if (newPassword) {
    try {
      // Update password
      yield user.updatePassword(newPassword);
    } catch (error) {
      yield put(updateUserFailure({ error: "error" }));
      return;
    }
  }

  yield put(updateUserSuccess());
}

export default function* loginRootSaga(): Saga<void> {
  yield all([
    takeEvery(deleteUserRequest, deleteUserSaga),
    takeEvery(updateUserRequest, updateUserSaga)
  ]);
}
