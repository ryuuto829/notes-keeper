import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

import loginRootSaga from "./settings";
import { call } from "redux-saga/effects";
import {
  deleteUserRequest,
  deleteUserFailure,
  deleteUserSuccess,
  updateUserFailure,
  updateUserSuccess,
  updateUserRequest
} from "../modules/settings";

const user = {
  email: "e",
  reauthenticateWithCredential: () =>
    jest
      .fn()
      .mockResolvedValueOnce("first call")
      .mockRejectedValueOnce(new Error("Async error")),
  updateProfile: () =>
    jest
      .fn()
      .fn()
      .mockResolvedValueOnce("first call")
      .mockRejectedValueOnce(new Error("Async error")),
  updateEmail: () =>
    jest
      .fn()
      .fn()
      .mockResolvedValueOnce("first call")
      .mockRejectedValueOnce(new Error("Async error")),
  delete: () =>
    jest
      .fn()
      .fn()
      .mockResolvedValueOnce("first call")
      .mockRejectedValueOnce(new Error("Async error"))
};

describe("settings sagas", () => {
  test("should put error when re-auth failed in deleteUserSaga", () => {
    const error = new Error("error");

    return expectSaga(loginRootSaga)
      .put({ type: deleteUserFailure.type, payload: { error: "error" } })
      .provide([
        call(user.reauthenticateWithCredential, "123", "e"),
        throwError(error)
      ])
      .dispatch({ type: deleteUserRequest.type, payload: { password: "123" } })
      .silentRun();
  });

  test("should put error when delete user failed in deleteUserSaga", () => {
    const error = new Error("error");

    return expectSaga(loginRootSaga)
      .put({ type: deleteUserFailure.type, payload: { error: "error" } })
      .provide([call(user.delete), throwError(error)])
      .provide([call(user.reauthenticateWithCredential, "s", "s"), true])
      .dispatch({ type: deleteUserRequest.type, payload: { password: "123" } })
      .silentRun();
  });

  test("should trigger auth watcher in deleteUserSaga", () => {
    return expectSaga(loginRootSaga)
      .dispatch({ type: deleteUserSuccess.type })
      .provide([call(user.delete), true])
      .provide([call(user.reauthenticateWithCredential, "s", "s"), true])
      .dispatch({ type: deleteUserRequest.type, payload: { password: "123" } })
      .silentRun();
  });

  test("should put error when re-auth failed in updateUserSaga", () => {
    const error = new Error("error");

    return expectSaga(loginRootSaga)
      .put({ type: updateUserFailure.type, payload: { error: "error" } })
      .provide([
        call(user.reauthenticateWithCredential, "s", "s"),
        throwError(error)
      ])
      .dispatch({
        type: updateUserRequest.type,
        payload: { password: "123", email: null, name: null }
      })
      .silentRun();
  });

  test("should put error when update name failed in updateUserSaga", () => {
    const error = new Error("error");

    return expectSaga(loginRootSaga)
      .put({ type: updateUserFailure.type, payload: { error: "error" } })
      .provide([
        call(user.updateProfile, { displayName: "name" }),
        throwError(error)
      ])
      .provide([call(user.reauthenticateWithCredential, "s", "s"), true])
      .dispatch({
        type: updateUserRequest.type,
        payload: { password: "123", email: null, name: "name" }
      })
      .silentRun();
  });

  test("should put error when update email failed in updateUserSaga", () => {
    const error = new Error("error");

    return expectSaga(loginRootSaga)
      .put({ type: updateUserFailure.type, payload: { error: "error" } })
      .provide([call(user.updateEmail, "e"), throwError(error)])
      .provide([call(user.reauthenticateWithCredential, "s", "s"), true])
      .dispatch({
        type: updateUserRequest.type,
        payload: { password: "123", email: "e", name: null }
      })
      .silentRun();
  });

  test("should success when no error in updateUserSaga", () => {
    return expectSaga(loginRootSaga)
      .dispatch({ type: updateUserSuccess.type })
      .provide([call(user.updateEmail, "e"), true])
      .provide([call(user.updateProfile, { displayName: "name" }), true])
      .provide([call(user.reauthenticateWithCredential, "s", "s"), true])
      .dispatch({
        type: updateUserRequest.type,
        payload: { password: "123", email: "e", name: "name" }
      })
      .silentRun();
  });
});
