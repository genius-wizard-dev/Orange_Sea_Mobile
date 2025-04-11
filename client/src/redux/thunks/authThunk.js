import {createAsyncThunk} from "@reduxjs/toolkit"
import { post } from "../../services/api.service"
import ENDPOINT from "../../constants/endpoint"

export const registerUser = createAsyncThunk(
    "authRegister/user",
    async (CredentialsContainer, {rejectWithValue})=>{
        try {
            
            // const res = await

        } catch (error) {
            
        }
    }
)