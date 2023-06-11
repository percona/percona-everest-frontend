import React from 'react';
import { ColorModeContext } from '@percona/design.theme-context-provider';
import { Box , PaletteMode, ThemeOptions } from '@mui/material';

import { ThemeContextProvider } from './theme-context-provider';

const themeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          error: {
            light: '#CE3C3C',
            main: '#BA1A1A',
            dark: '#9F0000',
            contrastText: '#FFFFFF',
          },
          warning: {
            light: '#F0B336',
            main: '#D8A02C',
            dark: '#AA7F26',
            contrastText: '#000000',
          },
          info: {
            light: '#CE3C3C',
            main: '#BA1A1A',
            dark: '#9F0000',
            contrastText: '#FFFFFF',
          },
          success: {
            light: '#127AE8',
            main: '#0E5FB5',
            dark: '#0B4A8C',
            contrastText: '#FFFFFF',
          },
          text: {
            primary: '#303642',
            secondary: 'rgba(48, 54, 66, 0.75)',
            disabled: 'rgba(48, 54, 66, 0.5)',
          },
          action: {
            hover: 'rgba(44, 50, 62, 0.04)',
            hoverOpacity: 0.04,
            disabled: 'rgba(44, 50, 62, 0.12)',
            disabledOpacity: 0.12,
            focus: 'rgba(44, 50, 62, 0.12)',
            focusOpacity: 0.12,
          },
          background: {
            default: '#FFFFFF',
            paper: '#FFFFFF',
          },
        }
      : {
          error: {
            light: '#FFCCC5',
            main: '#FFB4AB',
            dark: '#F7948C',
            contrastText: '#522625',
          },
          warning: {
            light: '#FAE7C1',
            main: '#F5CC78',
            dark: '#E1B252',
            contrastText: '#42361D',
          },
          info: {
            light: '#B6D9FF',
            main: '#93C7FF',
            dark: '#62AEFF',
            contrastText: '#0C335D',
          },
          success: {
            light: '#A0EADC',
            main: '#59DAC1',
            dark: '#2CBEA2',
            contrastText: '#0B322A',
          },
          text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.4)',
          },
          action: {
            hover: 'rgba(240, 241, 244, 0.06)',
            hoverOpacity: 0.06,
            disabled: 'rgba(240, 241, 244, 0.14)',
            disabledOpacity: 0.14,
            focus: 'rgba(240, 241, 244, 0.14)',
            focusOpacity: 0.14,
          },
          background: {
            default: '#2C323E',
            paper: '#2C323E',
          },
        }),
  },
});

const Toggler = () => {
  const colorMode = React.useContext(ColorModeContext);

  return <button type='button' onClick={colorMode.toggleColorMode}>Toggle</button>;
};

export const BasicThemeContextProvider = () => (
  <ThemeContextProvider themeOptions={themeOptions}>
    <Box
      sx={{
        width: 100,
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Toggler />
    </Box>
  </ThemeContextProvider>
);
