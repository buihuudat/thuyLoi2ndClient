import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  userData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;
