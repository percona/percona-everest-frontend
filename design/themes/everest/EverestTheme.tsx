import { PaletteMode } from '@mui/material';
import { ThemeOptions, createTheme } from '@mui/material/styles';

import { getTheme as getBaseTheme, getThemeType } from '@percona/design.themes.base';

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
        }),
  },
});

export const getTheme: getThemeType = (mode = 'light') =>
  createTheme(getBaseTheme(mode), themeOptions(mode));
