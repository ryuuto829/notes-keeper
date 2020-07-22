import { takeEvery } from 'redux-saga/effects';

import { AUTH_SIGN_IN_REQUEST, AUTH_SIGN_UP_REQUEST } from '../actions/actionTypes';
import { signInSaga, signUpSaga } from './auth';

export function* watchAuthSaga() {
  yield takeEvery(AUTH_SIGN_IN_REQUEST, signInSaga);
  yield takeEvery(AUTH_SIGN_UP_REQUEST, signUpSaga);
};
