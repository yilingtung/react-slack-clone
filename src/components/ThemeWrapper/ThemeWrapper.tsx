import { ThemeProvider } from 'styled-components';

import { useAppSelector } from '../../app/hooks';
import { selectThemeMode, ThemeModeEnum } from '../../features/themeSlice';
import { theme, themeColors } from '../../theme';

type Props = {
  children?: React.ReactNode;
};

export function ThemeWrapper({ children }: Props) {
  const themeMode = useAppSelector(selectThemeMode);

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
