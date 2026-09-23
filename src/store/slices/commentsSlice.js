import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Comments_SuccessCase, FailedCase, LoadingCase } from "../funcs"
import { APICall } from "../funcs"



export const initialState = {
     comments: [],
    user: null,
    success: false,
    successMessage: "",
    error: null,
}


export const LoadComments = createAsyncThunk(
    "articles/comments/load",
     async({articleId}, {rejectWithValue}) => {
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
export const DeleteComment = createAsyncThunk(
    "articles/comments/delete",
     async({commentId}, {rejectWithValue}) => {
            try {
                const response = await APICall({endpoint: `gitspedia/articles/comments/${commentId}`, method: "DELETE"})
                return response
            } catch (error) {
                return rejectWithValue(error.message)
            }
        }
) 
export const LikeComment = createAsyncThunk(
    "articles/comments/like",
     async({commentId, type, userID, articleID}, {rejectWithValue}) => {
            try {
                const response = await APICall({endpoint: `gitspedia/articles/comments/like/${commentId}`, method: "POST", data: {type, userID, articleID}})
                return response
            } catch (error) {
                return rejectWithValue(error.message)
            }
        }
) 
export const UnlikeComment = createAsyncThunk(
    "articles/comments/unlike",
     async({commentId, type, userID, articleID}, {rejectWithValue}) => {
            try {
                const response = await APICall({endpoint: `gitspedia/articles/comments/unlike/${commentId}`, method: "POST", data: {type, userID, articleID}})
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
        .addCase(DeleteComment.pending, LoadingCase)
        .addCase(DeleteComment.fulfilled, Comments_SuccessCase)
        .addCase(DeleteComment.rejected, FailedCase)
        .addCase(LikeComment.pending, LoadingCase)
        .addCase(LikeComment.fulfilled, Comments_SuccessCase)
        .addCase(LikeComment.rejected, FailedCase)
        .addCase(UnlikeComment.pending, LoadingCase)
        .addCase(UnlikeComment.fulfilled, Comments_SuccessCase)
        .addCase(UnlikeComment.rejected, FailedCase)
    }
})

export default CommentsSlice.reducer
