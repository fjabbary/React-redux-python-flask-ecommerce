

import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './features/api/productsApi';
import { customersApi } from './features/api/customersApi';
import { ordersApi } from './features/api/ordersApi';

import cartReducer from './features/cartSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware).concat(customersApi.middleware).concat(ordersApi.middleware)
});

export default store;

