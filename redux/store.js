import { configureStore } from "@reduxjs/toolkit";
import userReduer from "./features/userSlice";
const store = configureStore({
  reducer: {
    user: userReduer,
  },
});

export default store;
