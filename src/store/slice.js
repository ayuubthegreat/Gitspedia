import { createSlice } from "@reduxjs/toolkit"
import { AsyncThunk, FailedCase, LoadingCase } from "./funcs"



export const initialState = {
    articles: []
}


export const LoadArticles = AsyncThunk("articles/load", "GET")

export const ArticlesSlice = createSlice({
    name: "articles",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(LoadArticles.pending, LoadingCase)
        .addCase(LoadArticles.fulfilled, (state, action) => {
            state.loading = false
            state.articles = action.payload.data
        })
        .addCase(LoadArticles.rejected, FailedCase)
    }
})

export default ArticlesSlice.reducer