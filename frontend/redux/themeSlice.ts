import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  lightMode: boolean;
};
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? JSON.parse(storedTheme) : false;
  }
  return false;
};

const initialState: ThemeState = {
  lightMode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.lightMode = !state.lightMode;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", JSON.stringify(state.lightMode));
      }
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.lightMode = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", JSON.stringify(state.lightMode));
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
