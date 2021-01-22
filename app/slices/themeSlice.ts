import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Theme = "light" | "dark";
interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: (global.window?.__theme as Theme) || "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      if (state.theme === "light") {
        state.theme = "dark";
      } else {
        state.theme = "light";
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const themeSelector = (state: RootState) => state.theme.theme;
export default themeSlice.reducer;
