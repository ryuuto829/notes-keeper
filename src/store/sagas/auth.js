import { put } from 'redux-saga/effects';
import {
  authSignInSuccess,
  authSignInFailure
} from '../actions';
import { signInWithEmail } from '../../server/firebase';
import { checkFormValidity } from '../../utils';

export function* signInSaga({ email, password }) {
  /** Form validation */
  const errors = yield checkFormValidity([
    { type: 'email', text: email },
    { type: 'password', text: password }
  ]);

  if (Object.keys(errors).length !== 0) {
    yield put(authSignInFailure(errors));
    return;
  }

  /** Fetch user data from firebase */
  try {
    const user = yield signInWithEmail(email, password);
    yield put(authSignInSuccess(user));

  } catch (error) {
    yield put(authSignInFailure({ 'email': error.message, 'password': error.message }));
  }
};
