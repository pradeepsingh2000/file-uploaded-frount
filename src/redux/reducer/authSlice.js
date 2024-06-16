import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: "",
  token: "",
  userType: "user",
  isLogin: false,
  fullName: "",
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLogin = true;
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.userType = action.payload.userType;
      state.fullName = action.payload.fullName;
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectedLoggerInUser = (state) => state.auth;

export default authSlice.reducer;
