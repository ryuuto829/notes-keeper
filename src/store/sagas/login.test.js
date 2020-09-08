import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import loginRootSaga from "./login";
import { call } from "redux-saga/effects";
import {
  loginRequest,
  loginFailure,
  logoutSuccess,
  loginSuccess
} from "../modules/login";

const auth = {
  signInWithEmailAndPassword: () =>
    jest
      .fn()
      .mockResolvedValueOnce("first call")
      .mockRejectedValueOnce(new Error("Async error"))
};

describe("settings sagas", () => {
  test("should put error when login failed", () => {
    const error = new Error("error");

    return expectSaga(loginRootSaga)
      .dispatch({ type: loginFailure.type, payload: { error: "error" } })
      .put({ type: logoutSuccess.type, payload: undefined })
      .provide([
        call(auth.signInWithEmailAndPassword, "123", "e"),
        throwError(error)
      ])
      .dispatch({
        type: loginRequest.type,
        payload: { email: "e", password: "123" }
      })
      .silentRun();
  });

  test("should return user on login success", () => {
    return expectSaga(loginRootSaga)
      .dispatch({ type: loginSuccess.type, payload: { user: {} } })
      .provide([
        call(auth.signInWithEmailAndPassword, "123", "e"),
        { user: {} }
      ])
      .dispatch({
        type: loginRequest.type,
        payload: { email: "e", password: "123" }
      })
      .silentRun();
  });
});
