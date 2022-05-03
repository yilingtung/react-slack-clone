import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import themeReducer from '../features/themeSlice';
import globalReducer from '../features/globalSlice';
import chatReducer from '../features/chatSlice';
import counterReducer from '../features/counterSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    global: globalReducer,
    chat: chatReducer,
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
