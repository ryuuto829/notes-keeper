// @flow
import { createSlice } from "@reduxjs/toolkit";

type AuthStore = {
  auth: {
    isAuthenticated: boolean,
    initializing: boolean,
    isSignSuccess: boolean,
    isSubmitted: boolean,
    errorMessage: ?string
  }
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
    signSuccess: (state: AuthStore) => {
      return {
        ...state,
        isSignSuccess: true,
        isSubmitted: false,
        errorMessage: null
      };
    },
    signFailure: (state: AuthStore, action) => {
      const { errorMessages } = action.payload;
      return {
        ...state,
        isSignSuccess: false,
        isSubmitted: false,
        errorMessage: errorMessages
      };
    },
    authRequest: (state: AuthStore) => {
      return {
        ...state,
        initializing: true
      };
    },
    authSuccess: (state: AuthStore) => {
      return {
        ...state,
        isAuthenticated: true,
        initializing: false
      };
    },
    authFailure: (state: AuthStore) => {
      return {
        ...state,
        isAuthenticated: false,
        initializing: false
      };
    },
    logout: () => {
      return {
        isAuthenticated: false,
        initializing: false,
        isSignSuccess: false,
        isSubmitted: false,
        errorMessage: null
      };
    }
  }
});

export const selectInitializing = (state: AuthStore) => state.auth.initializing;

export const selectAuthenticated = (state: AuthStore) =>
  state.auth.isAuthenticated;
export const selectSignSuccess = (state: AuthStore) => state.auth.isSignSuccess;
export const selectSubmitted = (state: AuthStore) => state.auth.isSubmitted;
export const selectErrorMessage = (state: AuthStore) => state.auth.errorMessage;
export const {
  signIn,
  signUp,
  signSuccess,
  signFailure,
  authRequest,
  authSuccess,
  authFailure,
  logout,
  setAuthenticated
} = authSlice.actions;
export default authSlice.reducer;
