import { PaletteMode } from '@mui/material';
import { ThemeOptions, createTheme } from '@mui/material/styles';

import { getTheme as getBaseTheme } from '@percona/design.themes.base';

const themeOptions = (mode: PaletteMode): ThemeOptions => ({
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
          focusVisible: 'rgba(18, 119, 227, 0.3)',
          focusVisibleOpacity: 0.3,
        }
      } : {
        action: {
          hover: 'rgba(245, 204, 120, 0.08)',
          hoverOpacity: 0.08,
          selected: 'rgba(245, 204, 120, 0.12)',
          selectedOpacity: 0.12,
          focus: 'rgba(245, 204, 120, 0.15)',
          focusOpacity: 0.15,
          focusVisible: 'rgba(46, 147, 255, 0.3)',
          focusVisibleOpacity: 0.3
        }
      }),
  },
});

export const getTheme = (mode: PaletteMode = 'light') => createTheme(getBaseTheme(mode), themeOptions(mode));
