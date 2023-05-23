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
      },
    },
    button: {
      textTransform: 'none',
      lineHeight: '1',
      letterSpacing: '0.025em',
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
            disabled: 'rgba(44, 50, 62, 0.12)',
          },
          primary: {
            main: '#0E5FB5',
            light: '#127AE8',
            dark: '#0B4A8C',
          },
          text: {
            disabled: 'rgba(48, 54, 66, 0.5)',
          },
        }
      : {
          action: {
            hover: 'rgba(245, 204, 120, 0.08)',
            hoverOpacity: 0.08,
            selected: 'rgba(245, 204, 120, 0.12)',
            selectedOpacity: 0.12,
            focus: 'rgba(245, 204, 120, 0.15)',
            focusOpacity: 0.15,
            disabled: 'rgba(240, 241, 244, 0.14)',
          },
          primary: {
            main: '#62AEFF',
            light: '#B6D9FF',
            dark: '#1486FF',
          },
          text: {
            disabled: 'rgba(255, 255, 255, 0.4)',
          },
        }),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
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
              padding: '11px 22px',
            }),
            ...(ownerState.size === 'medium' && {
              padding: '9px 14px',
            }),
            ...(ownerState.size === 'small' && {
              padding: '6px 10px',
            }),
          }),
          ...(ownerState.size === 'large' && {
            fontSize: '16px',
          }),
          ...(ownerState.size === 'medium' && {
            fontSize: '16px',
          }),
          ...(ownerState.size === 'small' && {
            fontSize: '14px',
          }),
          '&: hover': {
            borderWidth: '2px',
          },
          '&: disabled': {
            borderWidth: '2px',
            ...(ownerState.variant === 'contained' && {
              backgroundColor: theme.palette.action.disabled,
            }),
            color: theme.palette.text.disabled,
          },
        }),
      },
    },
  },
});

export const getTheme = (mode: PaletteMode = 'light') =>
  createTheme(getBaseTheme(mode), themeOptions(mode));
