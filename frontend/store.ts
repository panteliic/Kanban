// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./redux/themeSlice";
import authReducer from "./redux/authSlice";
import loadingReducer from "./redux/LoadingSlice";
import boardReducer from "./redux/boardSlice"
import taskReducer from "./redux/taskSlice"
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    loading: loadingReducer,
    board: boardReducer,
    task:taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
