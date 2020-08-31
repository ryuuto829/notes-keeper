// @flow
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import { eventChannel, type Saga } from "redux-saga";
import {
  auth,
  signInWithEmail,
  createUser,
  updateUsername,
  logout,
  reAuthentication,
  deleteAccount
} from "../../server/firebase";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  updateUserProfile,
  deleteUserRequest,
  deleteUserFailure
} from "../modules/login";

// Get auth state observer
const getAuthChannel = () => {
  const authChannel = eventChannel(emit => {
    const unsubscribe = auth.onAuthStateChanged(user => emit({ user }));
    return unsubscribe;
  });
  return authChannel;
};

function* loginSaga(action) {
  const { email, password } = action.payload;

  try {
    yield signInWithEmail(email, password);
    yield console.log("[loginSaga] login success");
    // Successful login will trigger the loginStatusWatcher
  } catch (error) {
    yield console.log(error);
    yield put(loginFailure({ error: error.code }));
  }
}

function* registerSaga(action) {
  const { email, username, password } = action.payload;

  try {
    yield call(createUser, email, password);
    yield call(updateUsername, username);
    yield put(updateUserProfile());
    yield console.log("[registerSaga] register success");
    // Successful login will trigger the loginStatusWatcher
  } catch (error) {
    yield console.log(error);
    yield put(loginFailure({ error: error.code }));
  }
}

function* logoutSaga() {
  try {
    yield logout();
    yield console.log("[logoutSaga] logout success");
    // Successful logout will trigger the loginStatusWatcher
  } catch (error) {
    yield console.log(error);
    yield put(logoutFailure({ error: error.code }));
  }
}

function* deleteUserSaga(action) {
  const { password } = action.payload;
  const ERROR_MESSAGE = `Sorry, it looks like that your account can't be deleted at this moment or you pass wrong password, please try again.`;

  const error = yield call([auth.currentUser, reAuthentication], password);

  if (error) {
    yield put(deleteUserFailure({ error: ERROR_MESSAGE }));
  } else {
    const error = yield call([auth.currentUser, deleteAccount]);

    if (error) {
      yield put(deleteUserFailure({ error: ERROR_MESSAGE }));
    } else {
      yield logout();
    }
  }
}

function* loginStatusWatcher() {
  yield console.log("[loginStatusWatcher] wathcer added");
  const channel = yield call(getAuthChannel);

  while (true) {
    const { user } = yield take(channel);

    if (user) {
      yield put(loginSuccess({ user: user }));
      yield console.log("[loginStatusWatcher] login success");
    } else {
      yield put(logoutSuccess());
      yield console.log("[loginStatusWatcher] logout success");
    }
  }
}

export default function* loginRootSaga(): Saga<void> {
  // Auth state observer runs when app starts
  yield fork(loginStatusWatcher);
  yield all([
    takeEvery(loginRequest, loginSaga),
    takeEvery(registerRequest, registerSaga),
    takeEvery(logoutRequest, logoutSaga),
    takeEvery(deleteUserRequest, deleteUserSaga)
  ]);
}
