import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';

export interface ChatState {
  selectedRoomId: string | null;
  channelMessage: { [roomId: string]: string };
}

const initialState: ChatState = {
  selectedRoomId: null,
  channelMessage: {},
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedRoomId: (
      state,
      action: PayloadAction<ChatState['selectedRoomId']>
    ) => {
      state.selectedRoomId = action.payload;
    },
    setChannelMessage: (
      state,
      action: PayloadAction<{ roomId: string; message: string }>
    ) => {
      state.channelMessage[action.payload.roomId] = action.payload.message;
    },
  },
});

export const { setSelectedRoomId, setChannelMessage } = chatSlice.actions;

export const selectChat = (state: RootState) => ({
  selectedRoomId: state.chat.selectedRoomId,
});

export const selectChatChannelMessage = (state: RootState) =>
  state.chat.channelMessage[state.chat.selectedRoomId || ''] || '';

export const updateChatMessage =
  (message: string): AppThunk =>
  (dispatch, getState) => {
    const { selectedRoomId } = selectChat(getState());
    if (selectedRoomId !== null) {
      dispatch(setChannelMessage({ roomId: selectedRoomId, message }));
    }
  };

export default chatSlice.reducer;
