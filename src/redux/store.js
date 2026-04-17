import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";  // ✅ make sure this path is correct

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;