import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import themeReducer from "./slices/themeSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
  devTools: true,
});

store.subscribe(() => {
  if (global.window) {
    global.window.__setPreferredTheme(store.getState().theme.theme);
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
