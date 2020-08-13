// @flow
import { fork, all } from "redux-saga/effects";
import { type Saga } from "redux-saga";

import login from "./login";

export default function* rootSaga(): Saga<void> {
  yield all([
    fork(login)
    // fork other rootSaga's
  ]);
}
