import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../storage/redux/store";

const customerApi = createApi({
    reducerPath: "customerSlice",
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
    tagTypes: ["Customers"],
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => ({
                url: "customers"
            }),
            providesTags: ["Customers"],
        }),
        getCustomerById: builder.query({
            query: (id) => ({
                url: `customers/${id}`,
            }),
            providesTags: ["Customers"],
        }),
        createCustomer: builder.mutation({
            query: (data) => ({
                url: "customers",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Customers"],
        }),
        updateCustomer: builder.mutation({
            query: ({ data, id }) => ({
                url: "customers/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Customers"],
        }),
        deleteCustomer: builder.mutation({
            query: (id) => ({
                url: "customers/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Customers"],
        }),
    }),
});


export const {
    useGetCustomersQuery,
    useGetCustomerByIdQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation
} = customerApi;

export default customerApi;