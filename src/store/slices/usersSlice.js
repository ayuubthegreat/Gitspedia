import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APICall, LoadingCase, User_SuccessCase, FailedCase } from "../funcs";

export const initialState = {
    user: null,
    recentUsers: [],
    loading: false,
    success: false,
    successMessage: "",
    error: null,
}

// User slices

export const LoginUser = createAsyncThunk(
    "user/login",
    async({credentials}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: "auth/login", method: "POST", data: credentials})
            return response
        } catch (error) {
            console.error("Error:", error.message);
            return rejectWithValue(error.message)
        }
    }
)
export const RegisterUser = createAsyncThunk(
    "user/register",
    async({userData}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: "auth/register", method: "POST", data: userData})
            return response
        } catch (error) {
            console.error("Error:", error.message);
            return rejectWithValue(error.message)
        }
    }
)
export const GetUserInfo = createAsyncThunk(
    "user/getInfo",
    async({id}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `auth/user/${id}`, method: "GET"})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const UsersSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        ClearSuccessMessage: (state) => {
            state.success = false;
            state.successMessage = "";
        },
        Logout: (state) => {
            if (state.user) {
                let recentUsers = localStorage.getItem("recentUsers") ? localStorage.getItem("recentUsers").split(",") : [];
                let recentUserString = state.user.username.toString() + ":" + state.user.email.toString() + ":" + state.user.id.toString(); 
                if (!recentUsers.includes(recentUserString)) {
                    recentUsers += recentUserString + ",";
                    localStorage.setItem("recentUsers", recentUsers);
                }
            }
            state.user = null;
            state.success = false;
            state.successMessage = "";
            state.error = null;
            localStorage.removeItem("user");
        },
        FetchRecentUsers: (state) => {
            state.recentUsers = localStorage.getItem("recentUsers") ? localStorage.getItem("recentUsers").split(",") : [];
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(LoginUser.pending, LoadingCase)
        .addCase(LoginUser.fulfilled, User_SuccessCase)
        .addCase(LoginUser.rejected, FailedCase)
        .addCase(RegisterUser.pending, LoadingCase)
        .addCase(RegisterUser.fulfilled, User_SuccessCase)
        .addCase(RegisterUser.rejected, FailedCase)
        .addCase(GetUserInfo.pending, LoadingCase)
        .addCase(GetUserInfo.fulfilled, User_SuccessCase)
        .addCase(GetUserInfo.rejected, FailedCase)
    }
})

export const { ClearSuccessMessage, Logout, FetchRecentUsers } = UsersSlice.actions
export default UsersSlice.reducer