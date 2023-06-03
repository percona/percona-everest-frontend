import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { AppBar } from './components/app-bar/AppBar';
import { Drawer } from './components/drawer/Drawer';
import { DrawerContext } from './components/drawer/Drawer.context';
import { Box, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';

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
      <Box sx={{ display: 'flex' }}>
        <BarAndDrawer />
        <Box component='main' sx={{ padding: 4 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={
              <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                sapien faucibus et molestie ac.
              </Typography>
            }>
            </Route>
          </Routes>
        </Box>
      </Box>
    </ThemeContextProvider >
  );
}
