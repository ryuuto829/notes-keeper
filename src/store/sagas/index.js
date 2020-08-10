import { fork, all } from "redux-saga/effects";

import login from "./login";

export default function* rootSaga() {
  yield all([
    fork(login)
    // fork(messaging),
    // fork(storage),
  ]);
}
