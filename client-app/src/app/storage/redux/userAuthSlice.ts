import { createSlice } from "@reduxjs/toolkit";
import User from "../../models/user";

export const emptyUserState: User = {
    unique_name: "",
    nameid: "",
    email: "",
    role: "",
    jwtToken: "",
};

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: emptyUserState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.unique_name = action.payload.unique_name;
            state.nameid = action.payload.nameid;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
        setToken(state, action) {
            state.jwtToken = action.payload;
        },
        clearToken(state) {
            state.jwtToken = "";
        },
    },
});

export const { setLoggedInUser, setToken, clearToken } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;