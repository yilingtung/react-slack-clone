import { DefaultTheme } from 'styled-components';

const light: DefaultTheme['colors'] = {
  primary_foreground: '29,28,29',
  primary_background: '255,255,255',
  inverted_foreground: '255,255,255',
  inverted_background: '29,28,29',
  'navigation-bg': '53,13,54',
  'navigation-text': '255,255,255',
  'sidebar-bg': '63,14,64',
  'sidebar-bg--hover': '53,13,54',
  'sidebar-bg--selected': '17,100,163',
  'sidebar-text': '207,195,207',
  'sidebar-text--selected': '207,195,207',
};

const dark: DefaultTheme['colors'] = {
  primary_foreground: '209,210,211',
  primary_background: '26,29,33',
  inverted_foreground: '26,29,33',
  inverted_background: '209,210,211',
  'navigation-bg': '63,63,63',
  'navigation-text': '255,255,255',
  'sidebar-bg': '71,71,71',
  'sidebar-bg--hover': '63,63,63',
  'sidebar-bg--selected': '43,159,224',
  'sidebar-text': '199,199,200',
  'sidebar-text--selected': '255,255,255',
};

const themeColors = { light, dark };

export default themeColors;
