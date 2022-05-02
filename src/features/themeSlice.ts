import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export enum ThemeModeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

interface CounterState {
  themeMode: ThemeModeEnum;
}

const defaultMode = localStorage.getItem('theme-mode') || ThemeModeEnum.LIGHT;

const initialState: CounterState = {
  themeMode: defaultMode as ThemeModeEnum,
};

export const themeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeModeEnum>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;

export const selectThemeMode = (state: RootState) => state.themeMode.themeMode;

export default themeSlice.reducer;