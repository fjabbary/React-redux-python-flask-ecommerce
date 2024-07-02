import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state, action) {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart(state, action) {
      const existingItem = state.cartItems.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        existingItem.quantity += 1;
        toast.warning(`${existingItem.name} quantity increased to ${existingItem.quantity}`, {
          position: "bottom-left"
        })

      } else {
        const tempProduct = { ...action.payload, quantity: 1 }
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to the cart`, {
          position: "bottom-left"
        })
      }


    },

    removeFromCart(state, action) {
      console.log(action.payload);
    }
  },
});

export const { toggleCart, addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
