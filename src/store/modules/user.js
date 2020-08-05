// @flow
import { createSlice } from "@reduxjs/toolkit";

export type UserStore = {
  user: ?{
    displayName: string,
    email: string,
    emailVerified: boolean,
    uid: string,
    creationTime: string,
    lastSignInTime: string
  }
};

type Action = {
  payload: {
    user: ?{ ... }
  }
};

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    updateUserData: (state: UserStore, action: Action) => {
      const { user } = action.payload;
      if (!user) return null;
      return user;
    },
    removeUserData: () => null
  }
});

export const { updateUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
