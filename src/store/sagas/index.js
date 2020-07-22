import { takeEvery } from 'redux-saga/effects';

import { SUBMIT_SIGN_IN_FORM } from '../actions/actionTypes';
import { helloSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(SUBMIT_SIGN_IN_FORM, helloSaga);
}
