import { PaletteMode } from '@mui/material';
import { ThemeOptions, createTheme } from '@mui/material/styles';

import {
  getTheme as getBaseTheme,
  getThemeType,
} from '@percona/design.themes.base';

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
            outlinedBorder: 'rgba(18, 119, 227, 0.5)',
            outlinedBorderOpacity: 0.5,
          },
          primary: {
            main: '#0E5FB5',
            light: '#127AE8',
            dark: '#0B4A8C',
          },
        }
      : {
          action: {
            hover: 'rgba(46, 147, 255, 0.08)',
            hoverOpacity: 0.08,
            selected: 'rgba(46, 147, 255, 0.12)',
            selectedOpacity: 0.12,
            focus: 'rgba(46, 147, 255, 0.15)',
            focusOpacity: 0.15,
            focusVisible: 'rgba(46, 147, 255, 0.3)',
            focusVisibleOpacity: 0.3,
            outlinedBorder: 'rgba(46, 147, 255, 0.5)',
            outlinedBorderOpacity: 0.5,
          },
          primary: {
            main: '#62AEFF',
            light: '#B6D9FF',
            dark: '#1486FF',
          },
        }),
  },
  components: {
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          '&: hover': {
            backgroundColor: theme.palette.action.selected,
          },
          '&: focus': {
            backgroundColor: theme.palette.action.focusVisible,
          },
          ...(ownerState.size === 'large' && {
            svg: {
              width: 40,
              height: 40,
            },
          }),
          ...(ownerState.size === 'small' && {
            svg: {
              width: 20,
              height: 20,
            },
          }),
        }),
      },
    },
  },
});

export const getTheme: getThemeType = (mode = 'light') =>
  createTheme(getBaseTheme(mode), themeOptions(mode));
