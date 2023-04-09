import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const SocketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSocket } = SocketSlice.actions;
export default SocketSlice.reducer;
