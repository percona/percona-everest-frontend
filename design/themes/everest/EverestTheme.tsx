import { ThemeOptions, createTheme } from '@mui/material';

import { BaseTheme } from '@percona/design.themes.base';

let EverestTheme = createTheme();

const themeOptions: ThemeOptions = {
  // This is just an example to override base theme.
  // TODO remove afterwards
  typography: {
    h1: {
      fontWeight: 200,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '48px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '52px',
      }
    }
  }
};


EverestTheme = createTheme(BaseTheme, themeOptions);

export { EverestTheme };
