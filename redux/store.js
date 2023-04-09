import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./features/citySlice";
import userReducer from "./features/userSlice";
import productReducer from "./features/productSlice";
import messageReducer from "./features/messageSlice";
import socketReducer from "./features/socketSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    city: cityReducer,
    message: messageReducer,
    socket: socketReducer,
  },
});

export default store;
