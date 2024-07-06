import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const initialState = {
  isCartOpen: false,
  cartItems: JSON.parse(sessionStorage.getItem('cartItems')) || [],
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
          position: "bottom-right"
        })

      } else {
        const tempProduct = { ...action.payload, quantity: 1 }
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} added to the cart`, {
          position: "bottom-right"
        })
      }
      sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(item => item.product_id !== action.payload.product_id)
      toast.error(`${action.payload.name} removed from the cart`, {
        position: "bottom-right"
      })
      sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    removeAllCartItems(state, action) {
      state.cartItems = [];
      sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },

    closeCart(state, action) {
      state.isCartOpen = false;
    }
  },
});

export const { toggleCart, addToCart, removeFromCart, removeAllCartItems, closeCart } = cartSlice.actions;

export default cartSlice.reducer;
