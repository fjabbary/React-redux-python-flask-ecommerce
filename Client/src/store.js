
import rootReducer from './features/rootReducer';

import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './features/api/productSlice'; // Adjust the path as per your file structure

export const store = configureStore({
  reducer: {
    ...rootReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;

