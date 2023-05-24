import React, { createContext } from 'react';
import { ThemeProvider } from '@emotion/react';
import { useState } from 'react';
import { PaletteMode } from '@mui/material';
import { useMemo } from 'react';
import { getTheme } from '@percona/design.themes.base';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContextProviderProps } from './theme-context-provider.types';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const ThemeContextProvider = ({
  children,
  getThemeFn = getTheme,
}: ThemeContextProviderProps) => {
  const [mode, setMode] = useState<PaletteMode>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(() => getThemeFn(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
