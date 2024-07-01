

import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './features/api/productsApi';
import { customersApi } from './features/api/customersApi';

import productsReducer from './features/productsSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [customersApi.reducerPath]: customersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware).concat(customersApi.middleware),
});

export default store;

