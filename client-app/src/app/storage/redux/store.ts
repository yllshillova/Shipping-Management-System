import { configureStore } from "@reduxjs/toolkit";
import customerApi from "../../APIs/customerApi";
import warehouseApi from "../../APIs/warehouseApi";
import productApi from "../../APIs/productApi";
import orderApi from "../../APIs/orderApi";
import shipmentApi from "../../APIs/shipmentApi";
import { userAuthReducer } from "./userAuthSlice";
import accountApi from "../../APIs/accountApi";

const store = configureStore({
    reducer: {
        userAuthStore: userAuthReducer,
        [customerApi.reducerPath]: customerApi.reducer,
        [warehouseApi.reducerPath]: warehouseApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [shipmentApi.reducerPath]: shipmentApi.reducer,
        [accountApi.reducerPath]: accountApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(customerApi.middleware)
            .concat(warehouseApi.middleware)
            .concat(productApi.middleware)
            .concat(orderApi.middleware)
            .concat(shipmentApi.middleware)
            .concat(accountApi.middleware)

});

//exporting the root state

export type RootState = ReturnType<typeof store.getState>;
export default store;