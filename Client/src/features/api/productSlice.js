// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/products'
    }),

    getOneProduct: builder.query({
      query: (id) => `/products/${id}`
    }),

    addItem: builder.mutation({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      })
    }),

    updateItem: builder.mutation({
      query: ({ id, ...updatedItem }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: updatedItem,
      })
    }),

    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      })
    }),
  }),
});

export const { useGetAllProductsQuery, useGetOneProductQuery } = productsApi;
