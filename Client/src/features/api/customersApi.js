// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customersApi = createApi({
  reducerPath: "customersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getAllCustomers: builder.query({
      query: () => "/customers",
    }),

    getOneCustomer: builder.query({
      query: (id) => `/customers/${id}`,
    }),

    addCustomer: builder.mutation({
      query: (newCustomer) => ({
        url: "/customers",
        method: "POST",
        body: newCustomer,
      }),
    }),

    updateCustomer: builder.mutation({
      query: ({ id, ...updatedItem }) => {
        return {
          url: `/customers/${id}`,
          method: "PUT",
          body: updatedItem.newCustomer,
        };
      },
    }),

    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
    }),

    loginCustomer: builder.mutation({
      query: (credentials) => {
        return {
          url: "/login",
          method: "POST",
          body: credentials
        }
      }
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useGetOneCustomerQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useLoginCustomerMutation
} = customersApi;
