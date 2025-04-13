import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { loginUser, registerUser, verifyOTP } from "../thunks/authThunk";

import AsyncStorage from "@react-native-async-storage/async-storage";


const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
            // console.log("Token:", token);
            return token;
        } else {
            console.log("Không tìm thấy token");
            return null;
        }
    } catch (error) {
        console.error("Lỗi khi lấy token:", error);
        return null;
    }

};

const deleteToken = async () => {
    try {
        await AsyncStorage.removeItem("token");

    } catch (error) {
        console.error("Lỗi khi xoas token:", error);
        return null;
    }
}


// Gọi hàm khi cần
const fetchToken = async () => {
    const token = await getToken();
    if (token) {
        return token;
    }
};




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
const token = fetchToken();

const initialState = {
    user: null,
    token: isValidToken(token) ? token : null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    isLogin: isValidToken(token)
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
            deleteToken();
        },
    },
    extraReducers: (builder) => {
        builder

            // register
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                // state.token = action.payload.token;

                // AsyncStorage.setItem("token", action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || { message: "Đăng ký thất bại" };

                // console.warn("❌ registerUser bị từ chối:", action.payload);
            })



            // verify otp

            .addCase(verifyOTP.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                // state.token = action.payload.token;


            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || { message: "xac thuc thất bại" };

            })




            //login
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            // Login thành công
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                // state.user = action.payload.user;
                state.token = action.payload.data.access_token;
                state.isLogin = true;

                // console.log(action.payload.data.access_token)

                // Lưu token vào AsyncStorage
                AsyncStorage.setItem("token", action.payload.data.access_token);
            })
            // Login thất bại
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || { message: "Đăng nhập thất bại" };

            });





    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
