import { configureStore } from "@reduxjs/toolkit";
import userReduer from "./features/userSlice";
import productReducer from "./reducers/productReducer";
const store = configureStore({
  reducer: {
    user: userReduer,
    products: productReducer,
  },
});

export default store;
