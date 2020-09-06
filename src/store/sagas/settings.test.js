import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import { deleteUserSaga } from "./settings";
import { call } from "redux-saga/effects";
import { deleteUserFailure } from "../modules/settings";

describe("settings saga", () => {
  test("should put error when re-auth failed", () => {
    const user = {
      email: "e",
      reauthenticateWithCredential: () => jest.fn()
    };
    const error = new Error("error");

    return expectSaga(deleteUserSaga, {
      payload: { password1: "123" }
    })
      .provide([
        call(user.reauthenticateWithCredential, "s", "s"),
        throwError(error)
      ])
      .put({ type: deleteUserFailure.type, payload: { error: "error" } })
      .run();
  });

  test("should put error when delete user failed", () => {
    const user = {
      email: "e",
      reauthenticateWithCredential: () => jest.fn(),
      delete: () => jest.fn()
    };
    const error = new Error("error");

    return expectSaga(deleteUserSaga, {
      payload: { password1: "123" }
    })
      .provide([call(user.reauthenticateWithCredential, "s", "s"), true])
      .provide([call(user.delete), throwError(error)])
      .put({ type: deleteUserFailure.type, payload: { error: "error" } })
      .run();
  });

  test("should trigger auth watcher", () => {
    const user = {
      email: "e",
      reauthenticateWithCredential: () => jest.fn(),
      delete: () => jest.fn()
    };

    return expectSaga(deleteUserSaga, {
      payload: { password: "123" }
    })
      .provide([call(user.reauthenticateWithCredential, "s", "s"), true])
      .provide([call(user.delete), true])
      .run();
  });
});
