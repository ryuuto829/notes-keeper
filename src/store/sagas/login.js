// @flow
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { auth, signInWithEmail, logout } from "../../server/firebase";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure
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

function* loginStatusWatcher() {
  yield console.log("[loginStatusWatcher] wathcer added");
  const channel = yield call(getAuthChannel);

  while (true) {
    const { user } = yield take(channel);

    if (user) {
      yield console.log("[loginStatusWatcher] login success");
      yield put(loginSuccess({ user: user }));
    } else {
      yield console.log("[loginStatusWatcher] logout success");
      yield put(logoutSuccess());
    }
  }
}

export default function* loginRootSaga() {
  // Auth state observer runs when app starts
  yield fork(loginStatusWatcher);
  yield all([
    takeEvery(loginRequest, loginSaga),
    takeEvery(logoutRequest, logoutSaga)
  ]);
}
