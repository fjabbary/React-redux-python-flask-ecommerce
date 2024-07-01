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

    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      })
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...updatedItem }) => {
        return {
          url: `/products/${id}`,
          method: 'PUT',
          body: updatedItem,
        }
      }
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      })
    }),
  }),
});

export const { useGetAllProductsQuery, useGetOneProductQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productsApi;
