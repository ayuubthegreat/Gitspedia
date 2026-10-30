
import axios from "axios";
import { BASE_DATA } from "../BASE_DATA";


export const APICall = async ({endpoint, method = "GET", data = null}) => {
    try {
        const response = await axios({
            method,
            url: `${BASE_DATA.URL}/${endpoint}`,
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
    console.log(action.payload.data);
}
export const User_SuccessCase = (state, action) => {
    console.log("User success case triggered")
    state.loading = false
    state.user = action.payload.data
    console.log(action.payload.message);
    localStorage.setItem("user", state.user.id.toString())
    console.log("User successfully updated:", state.user)
}
export const Comments_SuccessCase = (state, action) => {
     state.loading = false
    state.comments = action.payload.data
    state.successMessage = action.payload.message
    state.success = true;
}
export const FailedCase = (state, action) => {
    state.loading = false
    state.error = action.payload
    console.error("Error:", action.payload)
}
