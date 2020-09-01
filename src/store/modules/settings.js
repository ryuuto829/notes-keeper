// @flow
import { createSlice } from "@reduxjs/toolkit";
import type { UserStore } from "../../types/UserStore";

type State = {
  login: {
    loading: boolean,
    loggedIn: boolean,
    user: ?UserStore,
    errorMessage: ?string
  }
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    loading: false,
    error: null
  },
  reducers: {
    deleteUserRequest: (state: State, action) => {
      console.log("[deleteUser] request");
      return {
        ...state,
        loading: true
      };
    },
    deleteUserFailure: (state: State, action) => {
      const { error } = action.payload;
      console.log("[deleteUser] failure");
      return {
        ...state,
        loading: false,
        error: error
      };
    },
    deleteUserSuccess: (state: State, action) => {
      console.log("[deleteUser] failure");
      return {
        ...state,
        loading: false
      };
    }
  }
});

export const {
  deleteUserRequest,
  deleteUserFailure,
  deleteUserSuccess
} = settingsSlice.actions;
export default settingsSlice.reducer;
