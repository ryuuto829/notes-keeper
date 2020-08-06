// @flow
import { createSlice } from "@reduxjs/toolkit";

export type UserStore = {
  user: ?{
    displayName: string,
    email: string,
    emailVerified: boolean,
    uid: string,
    createAt: string,
    lastLoginAt: string
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
    updateUser: (state: UserStore, action: Action) => {
      const { user } = action.payload;

      if (!user) return null;

      return user;
    },
    removeUser: () => null
  }
});

export const { updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
