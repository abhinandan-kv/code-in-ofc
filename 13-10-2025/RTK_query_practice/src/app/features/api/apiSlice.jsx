import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "fakeApi",
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  tagTypes: ["products"],
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    // The `getPosts` endpoint is a "query" operation that returns data.
    // The return value is a `Product[]` array, and it takes no arguments.
    getProducts: builder.query({
      // The URL for the request is '/fakeApi/products'
      query: () => "/products",
    }),
    createProduct: builder.mutation({
      query: (newPost) => ({
        url: "/products",
        method: "post",
        body: newPost,
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getProducts` query endpoint
export const { useGetProductsQuery, useCreateProductMutation } = apiSlice;
