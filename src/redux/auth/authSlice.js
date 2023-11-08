import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: null,
  email: null,
  avatar: null,
  userId: null,
  isLoginIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      login: payload.login,
      email: payload.email,
      userId: payload.userId,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      isLoginIn: payload.isLoginIn,
    }),
    authLogOut: () => ({
      login: null,
      email: null,
      avatar: null,
      userId: null,
      isLoginIn: false,
    }),
  },
});

export const authReducer = authSlice.reducer;
export const { updateUserProfile, authStateChange, authLogOut } =
  authSlice.actions;
