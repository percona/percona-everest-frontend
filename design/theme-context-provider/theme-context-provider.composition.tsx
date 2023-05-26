import React from 'react';
import { ThemeContextProvider } from './theme-context-provider';
import { ColorModeContext } from '@percona/design.theme-context-provider';
import { Box, useTheme } from '@mui/material';

const Toggler = () => {
  const colorMode = React.useContext(ColorModeContext);

  return <button onClick={colorMode.toggleColorMode}>Toggle</button>;
};

export const BasicThemeContextProvider = () => (
  <ThemeContextProvider>
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
