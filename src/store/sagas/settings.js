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

function* deleteUserSaga(action) {
  const { password } = action.payload;
  const user = auth.currentUser;

  try {
    // Reauthenticate user
    yield user.reauthenticateWithCredential(
      // $FlowFixMe in case when there's no user, we trigger watcher to logout
      firebase.auth.EmailAuthProvider.credential(user.email, password)
    );
    // Delete user will triger auth watcher and then logout
    yield user.delete();
    yield put(deleteUserSuccess());
  } catch (error) {
    yield put(
      deleteUserFailure({
        error: "Wrong password. Re-authentication has been failed"
      })
    );
  }
}

function* updateUserSaga(action) {
  const { password, name, email, newPassword } = action.payload;
  const user = auth.currentUser;

  try {
    // Reauthenticate user
    yield user.reauthenticateWithCredential(
      // $FlowFixMe in case when there's no user, we trigger watcher to logout
      firebase.auth.EmailAuthProvider.credential(user.email, password)
    );
  } catch (error) {
    yield put(
      updateUserFailure({
        error: "Wrong password. Re-authentication has been failed."
      })
    );
    return;
  }

  if (name) {
    try {
      // Update display name when it's new
      yield user.updateProfile({
        displayName: name
      });
    } catch (error) {
      yield put(
        updateUserFailure({ error: "Update username has been failed." })
      );
      return;
    }
  }

  if (email) {
    try {
      // Update email when it's new
      yield user.updateEmail(email);
    } catch (error) {
      yield put(updateUserFailure({ error: "Update email has been failed." }));
      return;
    }
  }

  if (newPassword) {
    try {
      // Update password
      yield user.updatePassword(newPassword);
    } catch (error) {
      yield put(
        updateUserFailure({ error: "Update password has been failed" })
      );
      return;
    }
  }

  yield put(
    updateUserSuccess({ text: "Your account has been successfully updated!" })
  );
}

export default function* loginRootSaga(): Saga<void> {
  yield all([
    takeEvery(deleteUserRequest, deleteUserSaga),
    takeEvery(updateUserRequest, updateUserSaga)
  ]);
}
