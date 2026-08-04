import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { APICall, Article_SuccessCase, FailedCase, LoadingCase, User_SuccessCase } from "../funcs"



export const initialState = {
    articles: [],
    user: null,
    success: false,
    successMessage: "",
    error: null,
}

// Article slices

export const LoadArticles = createAsyncThunk(
    "articles/load",
    async(_, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: "gitspedia/articles/", method: "GET"})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const LoadArticleById = createAsyncThunk(
    "articles/loadById",
    async({id}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `gitspedia/articles/${id}`, method: "GET"})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const CreateArticle = createAsyncThunk(
    "articles/create",
    async({articleData}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: "gitspedia/articles/", method: "POST", data: articleData})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const UpdateArticle = createAsyncThunk(
    "articles/update",
    async({articleData}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `gitspedia/articles/${articleData.id}`, method: "PUT", data: articleData})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)
export const DeleteArticle = createAsyncThunk(
    "articles/delete",
    async({id}, {rejectWithValue}) => {
        try {
            const response = await APICall({endpoint: `gitspedia/articles/${id}`, method: "DELETE"})
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


export const ArticlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(LoadArticles.pending, LoadingCase)
        .addCase(LoadArticles.fulfilled, Article_SuccessCase)
        .addCase(LoadArticles.rejected, FailedCase)
        builder
        .addCase(LoadArticleById.pending, LoadingCase)
        .addCase(LoadArticleById.fulfilled, Article_SuccessCase)
        .addCase(LoadArticleById.rejected, FailedCase)
        builder
        .addCase(CreateArticle.pending, LoadingCase)
        .addCase(CreateArticle.fulfilled, Article_SuccessCase)
        .addCase(CreateArticle.rejected, FailedCase)
        builder
        .addCase(UpdateArticle.pending, LoadingCase)
        .addCase(UpdateArticle.fulfilled, Article_SuccessCase)
        .addCase(UpdateArticle.rejected, FailedCase)
    }
})

export default ArticlesSlice.reducer