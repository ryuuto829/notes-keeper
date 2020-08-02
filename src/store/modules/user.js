import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    updateUserData: (state, action) => {
      const { user } = action.payload;

      if (!user) return null;

      return {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        uid: user.uid,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
      };
    },
    removeUserData: () => null,
  }
});

export const { updateUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
