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
      },
    },
    button: {
      textTransform: 'none',
      lineHeight: '1',
      letterSpacing: '0.025em',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: '128px',
          borderWidth: '2px',
          ...(ownerState.variant === 'contained' && {
            ...(ownerState.size === 'large' && {
              padding: '13px 24px',
            }),
            ...(ownerState.size === 'medium' && {
              padding: '11px 16px',
            }),
            ...(ownerState.size === 'small' && {
              padding: '8px 12px',
            }),
          }),
          ...(ownerState.variant === 'outlined' && {
            ...(ownerState.size === 'large' && {
              padding: '13px 22px',
            }),
            ...(ownerState.size === 'medium' && {
              padding: '11px 14px',
            }),
            ...(ownerState.size === 'small' && {
              padding: '8px 10px',
            }),
          }),
          '&: hover': {
            borderWidth: '2px',
          },
          '&: disabled': {
            borderWidth: '2px',
          },
        }),
      },
    },
  },
};

EverestTheme = createTheme(BaseTheme, themeOptions);

export { EverestTheme };
