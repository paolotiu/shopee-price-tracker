import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UiState {
  isSidebarOpen: boolean;
  isSidebarPossible: boolean;
}

const initialState: UiState = {
  isSidebarOpen: false,
  isSidebarPossible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    directSidebar: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    toggleSidebarPossibility: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      if (typeof action.payload !== "undefined") {
        state.isSidebarPossible = action.payload;
      } else {
        state.isSidebarPossible = !state.isSidebarOpen;
      }
    },
  },
});

export const {
  toggleSidebar,
  directSidebar,
  toggleSidebarPossibility,
} = uiSlice.actions;
export const sidebarSelector = (state: RootState) => state.ui.isSidebarOpen;
export const sidebarPossibilitySelector = (state: RootState) =>
  state.ui.isSidebarPossible;
export default uiSlice.reducer;
