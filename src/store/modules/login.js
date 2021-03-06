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

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: true,
    loggedIn: false,
    user: null,
    errorMessage: null
  },
  reducers: {
    // updateUserProfile gets latest user profile
    updateUserProfile: (state: State, action) => state,
    loginRequest: (state: State, action) => {
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    },
    registerRequest: (state: State, action) => {
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    },
    loginSuccess: (state: State, action) => {
      const { user } = action.payload;

      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: user,
        errorMessage: null
      };
    },
    loginFailure: (state: State, action) => {
      const { error } = action.payload;
      console.log(error);
      return {
        ...state,
        loading: false,
        errorMessage: error
      };
    },
    logoutRequest: (state: State, action) => {
      return {
        ...state,
        loading: true
      };
    },
    logoutSuccess: (state: State, action) => {
      return {
        ...state,
        loading: false,
        loggedIn: false,
        user: null,
        errorMessage: null
      };
    },
    logoutFailure: (state: State, action) => {
      const { error } = action.payload;
      console.log(error);
      return {
        ...state,
        loading: false,
        errorMessage: error
      };
    }
  }
});

export const selectLoggedIn = (state: State) => state.login.loggedIn;
export const selectErrorMessage = (state: State) => state.login.errorMessage;
export const selectLoading = (state: State) => state.login.loading;
export const selectUser = (state: State) => state.login.user;
export const {
  loginRequest,
  registerRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  updateUserProfile
} = loginSlice.actions;
export default loginSlice.reducer;
