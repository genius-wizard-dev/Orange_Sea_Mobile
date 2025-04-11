import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { registerUser } from "../thunks/authThunk";

const initialState = {
    user: null,
    token: null,
    status: null,
    isLogin: false,
};
const authSlice = createSlice({
    name :"auth",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isLogin = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
    
});

export const {} = authSlice.actions;
export default authSlice.reducer