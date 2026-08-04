import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_DATA } from "../BASE_DATA";
import { ClearSuccessMessage } from "./slices/usersSlice";


export const APICall = async ({endpoint, method = "GET", data = null}) => {
    try {
        const response = await axios({
            method,
            url: `${BASE_DATA.url}/${endpoint}`,
            data: data
        })
        return response.data
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
}


export const LoadingCase = (state) => {
    state.loading = true
    state.error = null
}
export const Article_SuccessCase = (state, action) => {
    state.loading = false
    state.articles = action.payload.data
    state.successMessage = action.payload.message
    state.success = true;
}
export const User_SuccessCase = (state, action) => {
    console.log("User success case triggered")
    state.loading = false
    state.user = action.payload.data
    state.successMessage = action.payload.message
    state.success = true;
    localStorage.setItem("user", state.user.id.toString())
    ClearSuccessMessage()
    console.log("User successfully updated:", state.user)
}
export const FailedCase = (state, action) => {
    state.loading = false
    state.error = action.payload
    console.error("Error:", action.payload)
}
