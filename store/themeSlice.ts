import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  lightMode: boolean;
};

const initialState: ThemeState = {
  lightMode: false, 
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.lightMode = !state.lightMode;
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.lightMode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
