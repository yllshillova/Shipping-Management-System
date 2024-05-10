import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const productApi = createApi({
    reducerPath: "productSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;

            const token = state.userAuthStore.jwtToken;

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url: "products"
            }),
            providesTags: ["Products"],
        }),
        getProductById: builder.query({
            query: (id) => ({
                url: `products/${id}`,
            }),
            providesTags: ["Products"],
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: "products",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Products"],
        }),
        updateProduct: builder.mutation({
            query: ({ data, id }) => ({
                url: "products/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Products"],
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: "products/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});


export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApi;

export default productApi;