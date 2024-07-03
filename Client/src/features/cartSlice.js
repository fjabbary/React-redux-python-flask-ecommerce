import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
  isCartOpen: false,
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
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
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(item => item.product_id !== action.payload.product_id)
      toast.error(`${action.payload.name} removed from the cart`, {
        position: "bottom-left"
      })
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    removeAllCartItems(state, action) {
      state.cartItems = [];
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    }
  },
});

export const { toggleCart, addToCart, removeFromCart, removeAllCartItems } = cartSlice.actions;

export default cartSlice.reducer;
