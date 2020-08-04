// @flow
import { createSlice } from "@reduxjs/toolkit";

type AuthStore = {
  isAuthenticated: boolean,
  isSubmitted: boolean,
  errorMessage: ?string
};

type Action = {};

export const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    signIn: (state: AuthStore) => {
      return {
        ...state,
        isSubmitted: true,
        errorMessage: null
      };
    },
    signUp: (state: AuthStore) => {
      return {
        ...state,
        isSubmitted: true,
        errorMessage: null
      };
    },
    success: () => {
      return {
        isAuthenticated: true,
        isSubmitted: false,
        errorMessage: null
      };
    },
    failure: (state: AuthStore, action) => {
      const { errorMessages } = action.payload;
      return {
        isAuthenticated: false,
        isSubmitted: false,
        errorMessage: errorMessages
      };
    },
    logout: () => {
      return {
        isAuthenticated: false,
        isSubmitted: false,
        errorMessage: null
      };
    }
  }
});

export const selectAuthenticated = (state: AuthStore) =>
  state.auth.isAuthenticated;
export const selectSubmitted = (state: AuthStore) => state.auth.isSubmitted;
export const selectErrorMessage = (state: AuthStore) => state.auth.errorMessage;
export const { signIn, signUp, success, failure, logout } = authSlice.actions;
export default authSlice.reducer;
