import { PaletteMode } from '@mui/material';
import { ThemeOptions, createTheme } from '@mui/material';

import { getTheme as getBaseTheme } from '@percona/design.themes.base';

let EverestTheme = createTheme();

const themeOptions = (mode: PaletteMode): ThemeOptions => ({
  // This is just an example to override base theme's typography.
  // TODO remove afterwards
  typography: {
    h1: {
      fontWeight: 200,
      [EverestTheme.breakpoints.down('sm')]: {
        fontSize: '48px',
      },
      [EverestTheme.breakpoints.up('sm')]: {
        fontSize: '52px',
      }
    },
    button: {
      textTransform: 'none',
      lineHeight: '1',
      letterSpacing: '0.025em',
      fontWeight: 500,
    },
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        action: {
          hover: 'rgba(119, 79, 170, 0.04)',
          hoverOpacity: 0.04,
          selected: 'rgba(119, 79, 170, 0.08)',
          selectedOpacity: 0.08,
          focus: 'rgba(119, 79, 170, 0.12)',
          focusOpacity: 0.12,
        }
      } : {
        action: {
          hover: 'rgba(245, 204, 120, 0.08)',
          hoverOpacity: 0.08,
          selected: 'rgba(245, 204, 120, 0.12)',
          selectedOpacity: 0.12,
          focus: 'rgba(245, 204, 120, 0.15)',
          focusOpacity: 0.15,
        }
      }),
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

});

export const getTheme = (mode: PaletteMode = 'light') => createTheme(getBaseTheme(mode), themeOptions(mode));
