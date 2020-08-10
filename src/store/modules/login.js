import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: true,
    loggedIn: false,
    user: null,
    errorMessage: null
  },
  reducers: {
    loginRequest: (state, action) => {
      return {
        ...state,
        loading: true
      };
    },
    loginSuccess: (state, action) => {
      const { user } = action.payload;

      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: user,
        errorMessage: null
      };
    },
    loginFailure: (state, action) => {
      const { error } = action.payload;
      console.log(error);
      return {
        ...state,
        loading: false,
        errorMessage: error
      };
    },
    logoutRequest: (state, action) => {
      return {
        ...state,
        loading: true
      };
    },
    logoutSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        loggedIn: false,
        user: null,
        errorMessage: null
      };
    },
    logoutFailure: (state, action) => {
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

export const selectLoggedIn = state => state.login.loggedIn;
export const selectErrorMessage = state => state.login.errorMessage;
export const selectLoading = state => state.login.loading;
export const selectUser = state => state.login.user;
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure
} = loginSlice.actions;
export default loginSlice.reducer;
