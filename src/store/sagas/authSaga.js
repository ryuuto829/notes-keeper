import { signInWithEmail, logout, auth } from "../../server/firebase";
import { signFailure, signSuccess } from "../../store/modules/auth";
import { logout, signIn, signUp, authRequest } from "../modules/auth";

function* loginSaga(action) {
  const { email, username, password } = action.payload;

  try {
    yield signInWithEmail(email, password);
    // Successful login will trigger the loginStatusWatcher
  } catch (error) {
    yield put(signFailure({ errorMessages: error.message }));
  }
}

function* logoutSaga() {
  try {
    yield call(logout());
    // Successful logout will trigger the loginStatusWatcher
  } catch (error) {
    yield put(signFailure({ errorMessages: error.message }));
  }
}

function* loginStatusWatcher() {
  // Events on this channel fire when the user logs in or logs out
  const channel = yield call(auth.channel);

  while (true) {
    const { user } = yield take(channel);

    if (user) yield put(loginSuccess(user));
    else yield put(logoutSuccess());
  }
}

export default function* loginRootSaga() {
  yield fork(loginStatusWatcher);
  yield all([
    takeEvery(signIn, loginSaga),
    takeEvery(logout, logoutSaga)
  ]);
}
