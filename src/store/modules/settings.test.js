import settings, { updateUserRequest, clearSnackbarMessage } from "./settings";

describe("settings reducer", () => {
  test("should clear errors and trigger loading", () => {
    expect(
      settings({ loading: false, error: "e" }, { type: updateUserRequest.type })
    ).toEqual({ loading: true, error: null });
  });

  test("should remove all errors", () => {
    expect(
      settings(
        { loading: false, error: "e", success: "s" },
        { type: clearSnackbarMessage.type }
      )
    ).toEqual({ loading: false, error: null, success: null });
  });
});
