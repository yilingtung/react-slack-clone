import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface ChatState {
  channelMessage: { [roomId: string]: string };
}

const initialState: ChatState = {
  channelMessage: {},
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChannelMessage: (
      state,
      action: PayloadAction<{ roomId: string; message: string }>
    ) => {
      state.channelMessage[action.payload.roomId] = action.payload.message;
    },
  },
});

export const { setChannelMessage } = chatSlice.actions;

export const selectChatChannelMessage = (state: RootState) =>
  state.chat.channelMessage;

export default chatSlice.reducer;
