import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    'styled-breakpoints': {
      sm: string;
      md: string;
      lg: string;
    };
    colors: {
      primary_foreground: string;
      primary_background: string;
      inverted_foreground: string;
      inverted_background: string;
      'login-bg': string;
      'login-inner-bg': string;
      'login-text': string;
      'login-button': string;
      'popover-bg': string;
      'popover-text': string;
      'navigation-bg': string;
      'navigation-text': string;
      'sidebar-bg': string;
      'sidebar-bg--hover': string;
      'sidebar-bg--selected': string;
      'sidebar-text': string;
      'sidebar-text--selected': string;
    };
    sizes: { sidebar_width: number; navigation_height: number };
  }
}
