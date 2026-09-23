import { configureStore } from "@reduxjs/toolkit";
import ArticlesReducer from "./slices/articlesSlice"
import UsersReducer from "./slices/usersSlice"
import CommentsReducer from "./slices/commentsSlice"


export const store = configureStore({
    reducer: {
        articles: ArticlesReducer,
        user: UsersReducer,
        comments: CommentsReducer,
    }
})
export default store


