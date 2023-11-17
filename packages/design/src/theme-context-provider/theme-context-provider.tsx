import { useState, useMemo, useCallback } from 'react';
import { ThemeProvider } from '@emotion/react';
import { PaletteMode, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContextProviderProps } from './theme-context-provider.types';
import { ColorModeContext } from './theme-contexts';

const ThemeContextProvider = ({
  children,
  themeOptions,
}: ThemeContextProviderProps) => {
  const [colorMode, setColorMode] = useState<PaletteMode>('light');
  const toggleColorMode = useCallback(() => {
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(
    () => createTheme(themeOptions(colorMode)),
    [colorMode, themeOptions]
  );

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeContextProvider;
