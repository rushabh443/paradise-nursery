import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // each item: { name, image, price, quantity }
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a plant to the cart (or bump its quantity if already there)
    addItem: (state, action) => {
      const { name, image, price } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        state.items.push({ name, image, price, quantity: 1 });
      }
    },
    // Remove a plant from the cart completely
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    // Set a new quantity for a plant
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((item) => item.name === name);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
