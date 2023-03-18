import { createSlice } from "@reduxjs/toolkit";
import GeneralAction from "../GeneralAction";

const initialState = {
  token: "",
  userData: {},
};

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       state.data = action.payload;
//     },
//     setToken: (state, action) => {
//       state.token = action.payload;
//     },
//   },
// });

// export const { setUser, setToken } = userSlice.actions;
// export default userSlice.reducer;

const userSlice = (state = initialState, action) => {
  switch (action.type) {
    case GeneralAction.types.SET_IS_APP_LOADING:
      return { ...state, isAppLoading: action.payload };
    case GeneralAction.types.SET_TOKEN:
      return { ...state, token: action.payload };
    case GeneralAction.types.SET_FIRST_TIME_USE:
      return { ...state, isFirstTimeUse: action.payload };
    case GeneralAction.types.SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default userSlice;
