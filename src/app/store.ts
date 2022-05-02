import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import themeModeReducer from '../features/themeSlice';
import counterReducer from '../features/counterSlice';

export const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
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
