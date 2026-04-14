import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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
        throw new Error("API call failed")
    }
}
export const AsyncThunk = (endpoint, method = "GET", data = null) => createAsyncThunk(
    endpoint,
    async () => {
        return await APICall({ endpoint, method, data });
    }
)

export const LoadingCase = (state) => {
    state.loading = true
    state.error = null
}
export const FailedCase = (state, action) => {
    state.loading = false
    state.error = action.error.message
}