import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shipmentApi = createApi({
    reducerPath: "shipmentSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
    }),
    tagTypes: ["Shipments"],
    endpoints: (builder) => ({
        getShipments: builder.query({
            query: () => ({
                url: "shipments"
            }),
            providesTags: ["Shipments"],
        }),
        getShipmentById: builder.query({
            query: (id) => ({
                url: `shipments/${id}`,
            }),
            providesTags: ["Shipments"],
        }),
        createShipment: builder.mutation({
            query: (data) => ({
                url: "shipments",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Shipments"],
        }),
        updateShipment: builder.mutation({
            query: ({ data, id }) => ({
                url: "shipments/" + id,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Shipments"],
        }),
        deleteShipment: builder.mutation({
            query: (id) => ({
                url: "shipments/" + id,
                method: "DELETE",
            }),
            invalidatesTags: ["Shipments"],
        }),
    }),
});


export const {
    useGetShipmentsQuery,
    useGetShipmentByIdQuery,
    useCreateShipmentMutation,
    useUpdateShipmentMutation,
    useDeleteShipmentMutation
} = shipmentApi;

export default shipmentApi;