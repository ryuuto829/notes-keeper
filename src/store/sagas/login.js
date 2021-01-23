// @flow
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";
import { eventChannel, type Saga } from "redux-saga";
import {
  auth,
  createUser,
  updateUsername,
  logout
} from "../../server/firebase";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  updateUserProfile
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
    yield call([auth, auth.signInWithEmailAndPassword], email, password);
    // [loginSaga] login success"
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
    // "[registerSaga] register success"
    // Successful login will trigger the loginStatusWatcher
  } catch (error) {
    yield console.log(error);
    yield put(loginFailure({ error: error.code }));
  }
}

function* logoutSaga() {
  try {
    yield logout();
    // [logoutSaga] logout success"
    // Successful logout will trigger the loginStatusWatcher
  } catch (error) {
    yield console.log(error);
    yield put(logoutFailure({ error: error.code }));
  }
}

function* loginStatusWatcher() {
  // [loginStatusWatcher] wathcer added
  const channel = yield call(getAuthChannel);

  while (true) {
    const { user } = yield take(channel);

    if (user) {
      yield put(loginSuccess({ user: user }));
      // [loginStatusWatcher] login success
    } else {
      yield put(logoutSuccess());
      // [loginStatusWatcher] logout success
    }
  }
}

export default function* loginRootSaga(): Saga<void> {
  // Auth state observer runs when app starts
  yield fork(loginStatusWatcher);
  yield all([
    takeEvery(loginRequest, loginSaga),
    takeEvery(registerRequest, registerSaga),
    takeEvery(logoutRequest, logoutSaga)
  ]);
}
