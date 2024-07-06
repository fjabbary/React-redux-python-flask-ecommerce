// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getAllorders: builder.query({
      query: () => "/orders",
    }),

    getOneorder: builder.query({
      query: (id) => `/orders/${id}`,
    }),

    addOrder: builder.mutation({
      query: (newOrder) => {
        return {
          url: "/orders",
          method: "POST",
          body: newOrder
        }
      }
    }),

    updateOrder: builder.mutation({
      query: ({ id, ...updatedItem }) => {
        return {
          url: `/orders/${id}`,
          method: "PUT",
          body: updatedItem.newOrder,
        };
      },
    }),

    deleteOrder: builder.mutation({
      query: (id) => {
        return {
          url: `/orders/${id}`,
          method: "DELETE",
        }
      }
    }),
  }),
});

export const {
  useGetAllordersQuery,
  useGetOneorderQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
