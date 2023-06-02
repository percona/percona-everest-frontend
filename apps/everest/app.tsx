import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { AppBar } from './components/app-bar/AppBar';
import { Drawer } from './components/drawer/Drawer';
import { DrawerContext } from './components/drawer/Drawer.context';
import { useMediaQuery, useTheme } from '@mui/material';

const BarAndDrawer = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const toggleOpen = () => setOpen((val) => !val);
  const activeBreakpoint = isMobile ? 'mobile' : (isDesktop ? 'desktop' : 'tablet');

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
      <BarAndDrawer />
      {/* header component */}
      <Routes>
        <Route path="/" element={<div>Hello Worldz!!</div>}>
          {/* home page component */}
        </Route>

        <Route path="/about">
          {/* about page component */}
        </Route>

      </Routes>
      {/* footer component */}
    </ThemeContextProvider>
  );
}
