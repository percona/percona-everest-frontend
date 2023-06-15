import { Box, Skeleton, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { K8Context } from "../../contexts/kubernetes/kubernetes.context";
import { DrawerContext } from "../drawer/Drawer.context";
import { AppBar } from '../app-bar/AppBar';
import { Drawer } from '../drawer/Drawer';

export const Main = () => {
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
  const { clusters } = useContext(K8Context);

  return (
    <DrawerContext.Provider value={{ open, toggleOpen, activeBreakpoint }}>
      <Box sx={{ display: 'flex' }}>
        <AppBar />
        {!clusters?.isFetching && <Drawer />}
        <Box component="main" sx={{ padding: 4, width: '100%' }}>
          {
            !!clusters?.isFetching ? (
              <>
                <Toolbar />
                <Skeleton variant="rectangular" />
                <Skeleton variant="rectangular" />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton variant="rectangular" />
              </>
            ) : (
              <>
                <Toolbar />
                <Outlet />
              </>
            )
          }
        </Box>
      </Box>
    </DrawerContext.Provider>
  );
}