import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Comments_SuccessCase, FailedCase, LoadingCase } from "../funcs"



export const initialState = {
     comments: [],
    user: null,
    success: false,
    successMessage: "",
    error: null,
}


export const LoadComments = createAsyncThunk(
    "articles/comments/load",
     async(articleId, {rejectWithValue}) => {
            try {
                const response = await APICall({endpoint: `gitspedia/articles/comments/${articleId}`, method: "GET"})
                return response
            } catch (error) {
                return rejectWithValue(error.message)
            }
        }
)
export const CreateComment = createAsyncThunk(
    "articles/comments/create",
     async({articleID, commentData}, {rejectWithValue}) => {
            try {
                const response = await APICall({endpoint: `gitspedia/articles/comments/${articleID}`, method: "POST", data: commentData})
                return response
            } catch (error) {
                return rejectWithValue(error.message)
            }
        }
)
export const UpdateComment = createAsyncThunk(
    "articles/comments/update",
     async(commentData, {rejectWithValue}) => {
            try {
                const response = await APICall({endpoint: `gitspedia/articles/comments/${commentData.id}`, method: "PUT", data: commentData})
                return response
            } catch (error) {
                return rejectWithValue(error.message)
            }
        }
)

export const CommentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(LoadComments.pending, LoadingCase)
        .addCase(LoadComments.fulfilled, Comments_SuccessCase)
        .addCase(LoadComments.rejected, FailedCase)
        .addCase(CreateComment.pending, LoadingCase)
        .addCase(CreateComment.fulfilled, Comments_SuccessCase)
        .addCase(CreateComment.rejected, FailedCase)
        .addCase(UpdateComment.pending, LoadingCase)
        .addCase(UpdateComment.fulfilled, Comments_SuccessCase)
        .addCase(UpdateComment.rejected, FailedCase)
    }
})

export default CommentsSlice.reducer
