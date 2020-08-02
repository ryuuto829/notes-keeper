import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    signIn: state => {
      return {
        ...state,
        isFetching: true
      };
    },
    signUp: state => {
      return {
        ...state,
        isFetching: true
      };
    },
    success: () => {
      return {
        isAuthenticated: true,
        isFetching: false,
        errorMessages: {}
      };
    },
    failure: (state, action) => {
      const { errorMessages } = action.payload;
      return {
        isAuthenticated: false,
        errorMessages: errorMessages,
        isFetching: false
      };
    },
    logout: () => {
      return {
        isAuthenticated: false,
        isFetching: false,
        errorMessages: {}
      };
    }
  }
});

export const selectAuthenticated = state => state.auth.isAuthenticated;
export const selectFetching = state => state.auth.isFetching;
export const selectErrorMessages = state => state.auth.errorMessages;
export const { signIn, signUp, success, failure, logout } = authSlice.actions;
export default authSlice.reducer;
