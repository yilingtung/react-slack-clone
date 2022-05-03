import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface GlobalState {
  isMobileSidebarOpen: boolean;
}

const initialState: GlobalState = {
  isMobileSidebarOpen: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMobileSidebarOpen: (
      state,
      action: PayloadAction<GlobalState['isMobileSidebarOpen']>
    ) => {
      state.isMobileSidebarOpen = action.payload;
    },
  },
});

export const { setMobileSidebarOpen } = globalSlice.actions;

export const selectMobileSidebarOpen = (state: RootState) =>
  state.global.isMobileSidebarOpen;

export default globalSlice.reducer;
