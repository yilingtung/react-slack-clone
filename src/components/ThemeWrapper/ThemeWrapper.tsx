import { useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectThemeMode,
  setThemeMode,
  ThemeModeEnum,
} from '../../features/themeSlice';
import { theme, themeColors } from '../../theme';

type Props = {
  children?: React.ReactNode;
};

export function ThemeWrapper({ children }: Props) {
  const hasRun = useRef(false);
  const themeMode = useAppSelector(selectThemeMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;

      // Check if slack-theme exist in localStorage
      const localMode = localStorage.getItem('slack-theme');
      if (
        localMode &&
        Object.values(ThemeModeEnum).includes(localMode as ThemeModeEnum)
      ) {
        dispatch(setThemeMode(localMode as ThemeModeEnum));
        return;
      }

      // If slack-theme not exist, store current themeMode
      localStorage.setItem('slack-theme', themeMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider
      theme={{
        ...theme,
        colors:
          themeMode === ThemeModeEnum.DARK
            ? themeColors.dark
            : themeColors.light,
      }}
    >
      {children}
    </ThemeProvider>
  );
}
