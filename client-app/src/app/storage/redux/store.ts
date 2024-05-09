import { configureStore } from "@reduxjs/toolkit";
import customerApi from "../../APIs/customerApi";

const store = configureStore({
    reducer: {
        [customerApi.reducerPath]: customerApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(customerApi.middleware)
});

//exporting the root state

export type RootState = ReturnType<typeof store.getState>;
export default store;