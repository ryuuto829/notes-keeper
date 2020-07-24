import { takeEvery } from 'redux-saga/effects';

import {
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_UP_REQUEST,
  AUTH_LOGOUT
} from '../actions/actionTypes';
import { signInSaga, signUpSaga, logoutSaga } from './authentication';

export function* watchAuthSaga() {
  yield takeEvery(AUTH_SIGN_IN_REQUEST, signInSaga);
  yield takeEvery(AUTH_SIGN_UP_REQUEST, signUpSaga);
  yield takeEvery(AUTH_LOGOUT, logoutSaga);
};
