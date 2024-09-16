import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice"
import storyReducer from "./features/storySlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        story: storyReducer,
    },
})

export type RootState = ReturnType< typeof store.getState>