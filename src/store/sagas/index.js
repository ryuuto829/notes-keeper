import { takeEvery } from 'redux-saga/effects';
import { signInSaga, signUpSaga, logoutSaga } from './authentication';
import { logout, signIn, signUp } from '../modules/auth';

export function* watchAuthSaga() {
  yield takeEvery(signIn, signInSaga);
  yield takeEvery(signUp, signUpSaga);
  yield takeEvery(logout, logoutSaga);
};
