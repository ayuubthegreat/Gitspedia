import { configureStore } from "@reduxjs/toolkit";
import ArticlesReducer from "./slice"


export const store = configureStore({
    reducer: {
        articles: ArticlesReducer

    }
})


