import { configureStore } from "@reduxjs/toolkit";
import ArticlesReducer from "./slices/articlesSlice"
import UsersReducer from "./slices/usersSlice"


export const store = configureStore({
    reducer: {
        articles: ArticlesReducer,
        user: UsersReducer
    }
})
export default store


