import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export enum ThemeModeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

interface CounterState {
  themeMode: ThemeModeEnum;
}

const defaultMode = localStorage.getItem('theme-mode') || ThemeModeEnum.DARK;

const initialState: CounterState = {
  themeMode: defaultMode as ThemeModeEnum,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeModeEnum>) => {
      state.themeMode = action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;

export const selectThemeMode = (state: RootState) => state.theme.themeMode;

export default themeSlice.reducer;
