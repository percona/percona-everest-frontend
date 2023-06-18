import { Box, Button, Skeleton, Stack, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import ReplayIcon from '@mui/icons-material/Replay';
import { K8Context } from "../../contexts/kubernetes/kubernetes.context";
import { DrawerContext } from "../drawer/Drawer.context";
import { AppBar } from '../app-bar/AppBar';
import { Drawer } from '../drawer/Drawer';
import { Messages } from "./Main.messages";

export const Main = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const toggleOpen = () => setDrawerOpen((val) => !val);
  const activeBreakpoint = isMobile
    ? 'mobile'
    : isDesktop
      ? 'desktop'
      : 'tablet';
  const { clusters } = useContext(K8Context);
  const isFetching = !!clusters?.isFetching;
  const badResult = !!clusters?.isError || !clusters?.data?.length;

  const handleClick = () => {
    clusters?.refetch();
  }

  return (
    <DrawerContext.Provider value={{ open: drawerOpen, toggleOpen, activeBreakpoint }}>
      <Box sx={{ display: 'flex' }}>
        <AppBar />
        {!isFetching && !badResult && <Drawer />}
        <Box component="main" sx={{ padding: 4, width: '100%' }}>
          <Toolbar />
          {
            isFetching ? (
              <>
                <Skeleton variant="rectangular" />
                <Skeleton variant="rectangular" />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton variant="rectangular" />
              </>
            ) : (
              badResult ? (
                <Stack alignItems='center'>
                  <Typography variant="subtitle1">{Messages.somethingWrong}</Typography>
                  <Button onClick={handleClick} variant="outlined" endIcon={<ReplayIcon />} sx={{ mt: 1 }}>
                    {Messages.retry}
                  </Button>
                </Stack>
              ) : (
                <Outlet />
              )
            )
          }
        </Box>
      </Box>
    </DrawerContext.Provider>
  );
}