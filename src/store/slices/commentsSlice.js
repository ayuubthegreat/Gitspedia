import { createAsyncThunk } from "@reduxjs/toolkit"



export const initialState = {
     comments: [],
    user: null,
    success: false,
    successMessage: "",
    error: null,
}


export const LoadComments = createAsyncThunk(
    "articles/comments/load",
     async(_, {rejectWithValue}) => {
            try {
                const response = await APICall({endpoint: "gitspedia/articles/comments", method: "GET"})
                return response
            } catch (error) {
                return rejectWithValue(error.message)
            }
        }
)
export const CreateComment = createAsyncThunk(
    "articles/comments/load",
     async(commentData, {rejectWithValue}) => {
            try {
                const response = await APICall({endpoint: "gitspedia/articles/comments", method: "POST", data: commentData})
                return response
            } catch (error) {
                return rejectWithValue(error.message)
            }
        }
)