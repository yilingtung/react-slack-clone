import { DefaultTheme } from 'styled-components';
import themeColors from './colors';
import { breakpointTheme } from './breakpoints';

const theme: DefaultTheme = {
  ...breakpointTheme,
  colors: themeColors.light,
  sizes: {
    sidebar_width: 280,
    navigation_height: 42,
  },
};

export default theme;
