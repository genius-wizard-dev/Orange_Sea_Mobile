import { createAsyncThunk } from "@reduxjs/toolkit"
import { post, get,getMeAxios } from "../../services/api.service"
import ENDPOINT from "../../constants/endpoint"


export const getMe = createAsyncThunk(
    "profileGetme/user",
    async ( {customHeaders, token},{ rejectWithValue }) => {
        try {
            // const { token } = getState().auth;

            // console.log(token)

            const res = await getMeAxios(ENDPOINT.GET_ME, token,customHeaders);


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