import { PaletteMode } from '@mui/material';
import { ThemeOptions, createTheme } from '@mui/material/styles';

import { getTheme as getBaseTheme } from '@percona/design.themes.base';

const themeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          action: {
            hover: 'rgba(18, 119, 227, 0.04)',
            hoverOpacity: 0.04,
            selected: 'rgba(18, 119, 227, 0.08)',
            selectedOpacity: 0.08,
            focus: 'rgba(18, 119, 227, 0.12)',
            focusOpacity: 0.12,
            focusVisible: 'rgba(18, 119, 227, 0.3)',
            focusVisibleOpacity: 0.3,
          },
          primary: {
            main: '#0E5FB5',
            light: '#127AE8',
            dark: '#0B4A8C',
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
            focusVisible: 'rgba(46, 147, 255, 0.3)',
            focusVisibleOpacity: 0.3,
          },
          primary: {
            main: '#62AEFF',
            light: '#B6D9FF',
            dark: '#1486FF',
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
            borderColor: theme.palette.primary.main,
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
            ...(ownerState.variant === 'outlined' && {
              backgroundColor: theme.palette.action.hover,
            }),
          },
          '&: disabled': {
            borderWidth: '2px',
            ...(ownerState.variant === 'contained' && {
              backgroundColor: theme.palette.action.disabled,
            }),
            color: theme.palette.text.disabled,
          },
          '&: focus': {
            ...(ownerState.variant === 'outlined' && {
              backgroundColor: theme.palette.action.focus,
            }),
            ...(ownerState.variant === 'contained' && {
              backgroundColor: theme.palette.primary.dark,
            }),
            ...(ownerState.variant === 'text' && {
              backgroundColor: theme.palette.action.focus,
            }),
          },
        }),
      },
    },
  },
});

export const getTheme = (mode: PaletteMode = 'light') =>
  createTheme(getBaseTheme(mode), themeOptions(mode));
