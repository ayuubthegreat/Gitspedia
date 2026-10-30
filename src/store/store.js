import { configureStore } from "@reduxjs/toolkit";
import ArticlesReducer from "./slices/articlesSlice"
import UserReducer from "./slices/usersSlice";


export const store = configureStore({
    reducer: {
        articles: ArticlesReducer,
        user: UserReducer,
    }
})
export default store


