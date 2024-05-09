import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const warehouseApi = createApi({
    reducerPath: "warehouseSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
    }),
    tagTypes: ["Warehouses"],
    endpoints: (builder) => ({
        getWarehouses: builder.query({
            query: () => ({
                url: "warehouses"
            }),
            providesTags: ["Warehouses"],
        }),
        getWarehouseById: builder.query({
            query: (id) => ({
                url: `warehouses/${id}`,
            }),
            providesTags: ["Warehouses"],
        }),
        createWarehouse: builder.mutation({
            query: (data) => ({
                url: "warehouses",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Warehouses"],
        }),
        updateWarehouse: builder.mutation({
            query: ({ data, id }) => ({
                url: "warehouses/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Warehouses"],
        }),
        deleteWarehouse: builder.mutation({
            query: (id) => ({
                url: "warehouses/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Warehouses"],
        }),
    }),
});


export const {
    useGetWarehousesQuery,
    useGetWarehouseByIdQuery,
    useCreateWarehouseMutation,
    useUpdateWarehouseMutation,
    useDeleteWarehouseMutation
} = warehouseApi;

export default warehouseApi;