// @flow
import { fork, all } from "redux-saga/effects";
import { type Saga } from "redux-saga";

import login from "./login";
import settings from "./settings";

export default function* rootSaga(): Saga<void> {
  yield all([fork(login), fork(settings)]);
}
