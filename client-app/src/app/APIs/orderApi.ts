import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
    reducerPath: "orderSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
    }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => ({
                url: "orders"
            }),
            providesTags: ["Orders"],
        }),
        getOrderById: builder.query({
            query: (id) => ({
                url: `orders/${id}`,
            }),
            providesTags: ["Orders"],
        }),
        createOrder: builder.mutation({
            query: (data) => ({
                url: "orders",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Orders"],
        }),
        updateOrder: builder.mutation({
            query: ({ data, id }) => ({
                url: "orders/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Orders"],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: "orders/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Orders"],
        }),
    }),
});


export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = orderApi;

export default orderApi;