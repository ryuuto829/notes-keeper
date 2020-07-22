import { takeEvery } from 'redux-saga/effects';

import { AUTH_SIGN_IN_REQUEST } from '../actions/actionTypes';
import { signInSaga } from './auth';

export function* watchAuthSaga() {
  yield takeEvery(AUTH_SIGN_IN_REQUEST, signInSaga);
};
