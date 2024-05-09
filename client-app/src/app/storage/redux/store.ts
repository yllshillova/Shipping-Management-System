import { configureStore } from "@reduxjs/toolkit";
import customerApi from "../../APIs/customerApi";
import warehouseApi from "../../APIs/warehouseApi";
import productApi from "../../APIs/productApi";
import orderApi from "../../APIs/orderApi";
import shipmentApi from "../../APIs/shipmentApi";

const store = configureStore({
    reducer: {
        [customerApi.reducerPath]: customerApi.reducer,
        [warehouseApi.reducerPath]: warehouseApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [shipmentApi.reducerPath]: shipmentApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(customerApi.middleware)
            .concat(warehouseApi.middleware)
            .concat(productApi.middleware)
            .concat(orderApi.middleware)
            .concat(shipmentApi.middleware)
});

//exporting the root state

export type RootState = ReturnType<typeof store.getState>;
export default store;