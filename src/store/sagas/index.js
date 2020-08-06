import { takeEvery } from "redux-saga/effects";
import {
  signInSaga,
  signUpSaga,
  logoutSaga,
  getUserData
} from "./authentication";
import { logout, signIn, signUp, authRequest } from "../modules/auth";
import { updateUser } from "../modules/user";

export function* watchAuthSaga() {
  yield takeEvery(signIn, signInSaga);
  yield takeEvery(signUp, signUpSaga);
  yield takeEvery(logout, logoutSaga);
  yield takeEvery(authRequest, getUserData);
  // yield takeEvery(updateUser, getUserData);
}
