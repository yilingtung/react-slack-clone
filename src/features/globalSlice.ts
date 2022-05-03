import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface GlobalState {
  isMobileSidebarOpen: boolean;
  roomId: null | string;
}

const initialState: GlobalState = {
  isMobileSidebarOpen: false,
  roomId: null,
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
    setRoomId: (state, action: PayloadAction<GlobalState['roomId']>) => {
      state.roomId = action.payload;
    },
  },
});

export const { setMobileSidebarOpen, setRoomId } = globalSlice.actions;

export const selectMobileSidebarOpen = (state: RootState) =>
  state.global.isMobileSidebarOpen;

export const selectRoomId = (state: RootState) => state.global.roomId;

export default globalSlice.reducer;
