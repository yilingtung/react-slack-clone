import { DefaultTheme } from 'styled-components';
import { createTheme } from 'styled-breakpoints';
import themeColors from './colors';

const breakpoints = createTheme({
  sm: '576px',
  md: '768px',
  lg: '992px',
});

const theme: DefaultTheme = {
  ...breakpoints,
  colors: themeColors.light,
};

export default theme;
