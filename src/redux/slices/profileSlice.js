import { createSlice } from "@reduxjs/toolkit";
import { getMe } from "../thunks/profileThunk";   

const initialState = {
    userProfile: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMe.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.userProfile = action.payload;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || { message: "Lỗi không xác định khi lấy profile" };
            });
    },
});

export const {  } = profileSlice.actions;
export default profileSlice.reducer;
