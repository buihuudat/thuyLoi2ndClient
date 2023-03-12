import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: "",
};

export const CitySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCity } = CitySlice.actions;
export default CitySlice.reducer;
