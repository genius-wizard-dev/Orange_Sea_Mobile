import {createAsyncThunk} from "@reduxjs/toolkit"
import { post } from "../../services/api.service"
import ENDPOINT from "../../constants/endpoint"

export const registerUser = createAsyncThunk(
    "authRegister/user",
    async (CredentialsContainer, {rejectWithValue})=>{
        try {
            
            const res = await post(ENDPOINT.REGISTER_USER, registerUser);
            if(!res.data.token){
                throw new Error("token khong hop le");
            }
            return res.data;

        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ message: "Lỗi không xác định thunks - server bị lỗi/chưa khởi động" });
            }
        }
    }
)