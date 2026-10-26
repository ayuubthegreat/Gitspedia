import { configureStore } from "@reduxjs/toolkit";
import ArticlesReducer from "./slices/articlesSlice"


export const store = configureStore({
    reducer: {
        articles: ArticlesReducer,
    }
})
export default store


