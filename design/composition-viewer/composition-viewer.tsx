import { useTheme } from '@mui/material/styles';
import React from 'react';
import {
  ColorModeContext,
  ThemeContextProvider,
} from '@percona/design.theme-context-provider';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Stack, Box, IconButton, AppBar } from '@mui/material';
import {
  ColorTogglerProps,
  CompositionViewerProps,
} from './composition-viewer.types';

const ColorToggler = ({ ...props }: ColorTogglerProps) => {
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();

  return (
    <IconButton onClick={colorMode.toggleColorMode} {...props}>
      {theme.palette.mode === 'dark' ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
};

export const CompositionViewer = ({
  children,
  ...rest
}: CompositionViewerProps) => (
  <ThemeContextProvider {...rest}>
    <Stack>
      <AppBar position="static" sx={{ backgroundColor: '#1976D2' }}>
        <ColorToggler sx={{ marginLeft: 'auto', color: 'white' }} />
      </AppBar>
      <Box sx={{ backgroundColor: 'background.default' }}>{children}</Box>
    </Stack>
  </ThemeContextProvider>
);
