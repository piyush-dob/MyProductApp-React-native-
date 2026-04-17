import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    increment: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.count += 1;
    },
    decrement: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.count === 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        } else {
          item.count -= 1;
        }
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, increment, decrement, removeFromCart,clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
