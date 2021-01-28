import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UiState {
  isSidebarOpen: boolean;
}

const initialState: UiState = { isSidebarOpen: false };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },

    directSidebar: (state, action: PayloadAction<UiState>) => {
      state.isSidebarOpen = action.payload.isSidebarOpen;
    },
  },
});

export const { toggleSidebar, directSidebar } = uiSlice.actions;
export const sidebarSelector = (state: RootState) => state.ui.isSidebarOpen;
export default uiSlice.reducer;
