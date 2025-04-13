import { createAsyncThunk } from "@reduxjs/toolkit"
import { post, get, getMeAxios, putMeAxios } from "../../services/api.service"
import ENDPOINT from "../../constants/endpoint"


export const getMe = createAsyncThunk(
    "profileGetme/user",
    async ({ customHeaders, token }, { rejectWithValue }) => {
        try {
            // const { token } = getState().auth;

            // console.log(token)

            const res = await getMeAxios(ENDPOINT.GET_ME, token, customHeaders);


            // console.log(res)
            return res.data;

        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: "Lỗi không xác định profile thunks - server bị lỗi/chưa khởi động" });
            }
        }
    }
);


export const putMe = createAsyncThunk(
    "profileUpdate/user",
    async ({ data, token, customHeaders }, { rejectWithValue }) => {
        try {
            const res = await putMeAxios(ENDPOINT.PUT_ME, data, token, customHeaders);

            return res.data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({
                    message: "Lỗi không xác định khi cập nhật thông tin người dùng.",
                });
            }
        }
    }
);