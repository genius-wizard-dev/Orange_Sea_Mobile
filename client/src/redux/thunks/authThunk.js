import { createAsyncThunk } from "@reduxjs/toolkit"
import { post } from "../../services/api.service"
import ENDPOINT from "../../constants/endpoint"

export const registerUser = createAsyncThunk(
    "authRegister/user",
    async (data, { rejectWithValue }) => {
        try {

            const res = await post(ENDPOINT.REGISTER_USER, data);


            // console.log(res)
            return res.data;

        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: "Lỗi không xác định thunks - server bị lỗi/chưa khởi động" });
            }
        }
    }
);

export const verifyOTP = createAsyncThunk(
    "authVerifyOTP/user",
    async (data, { rejectWithValue }) => {
        try {

            const res = await post(ENDPOINT.VERIFY_OTP, data);


            // console.log(res)
            return res.data;

        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: "Lỗi không xác định thunks - server bị lỗi/chưa khởi động" });
            }
        }
    }
);