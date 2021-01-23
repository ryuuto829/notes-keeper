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
    error: null,
    success: null
  },
  reducers: {
    deleteUserRequest: (state: State, action) => {
      // [deleteUser] request
      return {
        ...state,
        loading: true,
        error: null,
        success: null
      };
    },
    deleteUserFailure: (state: State, action) => {
      const { error } = action.payload;
      // [deleteUser] failure
      return {
        ...state,
        loading: false,
        error: error
      };
    },
    deleteUserSuccess: (state: State, action) => {
      // [deleteUser] success
      return {
        ...state,
        loading: false
      };
    },
    updateUserRequest: (state: State, action) => {
      // [updateUser] request
      return {
        ...state,
        loading: true,
        error: null,
        success: null
      };
    },
    updateUserFailure: (state: State, action) => {
      const { error } = action.payload;
      // [updateUser] failure
      return {
        ...state,
        loading: false,
        error: error
      };
    },
    updateUserSuccess: (state: State, action) => {
      const { text } = action.payload;
      // [updateUser] success"
      return {
        ...state,
        loading: false,
        success: text
      };
    },
    clearSnackbarMessage: (state: State, action) => {
      // [clearSnackbarMessage]
      return {
        ...state,
        error: null,
        success: null
      };
    }
  }
});

export const selectError = state => state.settings.error;
export const selectSuccess = state => state.settings.success;

export const {
  deleteUserRequest,
  deleteUserFailure,
  deleteUserSuccess,
  updateUserRequest,
  updateUserFailure,
  updateUserSuccess,
  clearSnackbarMessage
} = settingsSlice.actions;
export default settingsSlice.reducer;
