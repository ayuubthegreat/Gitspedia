import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import z from "zod"
import { APICall, FailedCase, LoadingCase, User_SuccessCase } from "../funcs"



export const userSchema = z.object({
    username: z.string().min(5, "Username must be 5 characters long...").max(100, "Username character limit exceeded"),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    password: z.string().min(5).max(100),
})
export const initialState = {
    user: null,
    error: null,
    loading: false
}

export const LoginUser = createAsyncThunk(
    "user/login",
    async({loginData}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `auth/login`, method: "POST", data: loginData});
            return response
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const RegisterUser = createAsyncThunk(
    "user/register",
    async({loginData}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `auth/register`, method: "POST", data: loginData});
            return response
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
export const GetUsers = createAsyncThunk(
    "user/get",
    async (_, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `auth/users/gitspedia`, method: "POST",});
            return response
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)


export const UsersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(LoginUser.pending, LoadingCase)
        .addCase(LoginUser.fulfilled, User_SuccessCase)
        .addCase(LoginUser.rejected, FailedCase)
        builder
        .addCase(RegisterUser.pending, LoadingCase)
        .addCase(RegisterUser.fulfilled, User_SuccessCase)
        .addCase(RegisterUser.rejected, FailedCase)
        builder
        .addCase(GetUsers.pending, LoadingCase)
        .addCase(GetUsers.fulfilled, (state, action) => {
            console.log("Found users: ", action.payload.data);
        })
        .addCase(GetUsers.rejected, FailedCase)
    }
})
export default UsersSlice.reducer

