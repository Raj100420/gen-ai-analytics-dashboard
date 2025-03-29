import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  showSuggestions: boolean;
  mobileSidebarOpen: boolean;
  activeResult: string | null;
}

const initialState: UiState = {
  showSuggestions: false,
  mobileSidebarOpen: false,
  activeResult: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSuggestions(state, action: PayloadAction<boolean>) {
      state.showSuggestions = action.payload;
    },
    toggleMobileSidebar(state, action: PayloadAction<boolean>) {
      state.mobileSidebarOpen = action.payload;
    },
    setActiveResult(state, action: PayloadAction<string | null>) {
      state.activeResult = action.payload;
    },
  },
});

export const { toggleSuggestions, toggleMobileSidebar, setActiveResult } = uiSlice.actions;
export default uiSlice.reducer;
