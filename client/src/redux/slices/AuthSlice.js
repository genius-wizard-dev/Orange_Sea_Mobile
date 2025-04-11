import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { registerUser } from "../thunks/authThunk";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Hàm kiểm tra token có hợp lệ hay không
const isValidToken = (token) => {
    try {
        if (!token) return false;
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now();
    } catch (error) {
        return false;
    }
};

// Khởi tạo token từ AsyncStorage nếu cần
const token = null; // chưa load từ AsyncStorage

const initialState = {
    user: null,
    token: isValidToken(token) ? token : null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
            AsyncStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.token;

                AsyncStorage.setItem("token", action.payload.token); // Lưu token nếu muốn
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || { message: "Đăng ký thất bại" };

                console.warn("❌ registerUser bị từ chối:", action.payload);
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
