import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: true, name: "Ali Hatem" },
  reducers: {
    loggedOut: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { loggedOut } = authSlice.actions;

export default authSlice.reducer;
