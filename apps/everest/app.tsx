import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { AppBar } from './components/app-bar/AppBar';
import { Drawer } from './components/drawer/Drawer';
import { DrawerContext } from './components/drawer/Drawer.context';

export const BarAndDrawer = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const toggleOpen = () => setOpen((val) => !val);
  const activeBreakpoint = isMobile
    ? 'mobile'
    : isDesktop
    ? 'desktop'
    : 'tablet';

  return (
    <DrawerContext.Provider value={{ open, toggleOpen, activeBreakpoint }}>
      <AppBar />
      <Drawer />
    </DrawerContext.Provider>
  );
};

export const EverestApp = () => {
  return (
    <ThemeContextProvider themeOptions={everestThemeOptions}>
      <Box sx={{ display: 'flex' }}>
        <BarAndDrawer />
        <Box component="main" sx={{ padding: 4, width: '100%' }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeContextProvider>
  );
};
