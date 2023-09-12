import ReplayIcon from '@mui/icons-material/Replay';
import {
  Box,
  Button,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DrawerContext } from '../../contexts/drawer/drawer.context';
import { K8Context } from '../../contexts/kubernetes/kubernetes.context';
import { AppBar } from '../app-bar/AppBar';
import { Drawer } from '../drawer/Drawer';
import { WelcomeDialog } from '../welcome-dialog/welcome-dialog';
import { Messages } from './Main.messages';

export const Main = () => {
  const theme = useTheme();
  const [openWelcomeDialog, setOpenWelcomeDialog] = useState(true);
  const { activeBreakpoint } = useContext(DrawerContext);
  const { clusters } = useContext(K8Context);
  const isFetching = !!clusters?.isFetching;
  const badResult = !!clusters?.isError;
  const noKubernetesClusters = !clusters?.data?.length;

  const handleCloseWelcomeDialog = () => {
    setOpenWelcomeDialog(false);
  };

  const handleClick = () => {
    clusters?.refetch();
  };

  const drawerWidth = theme.breakpoints.up('sm')
    ? `calc(${theme.spacing(8)} + 1px)`
    : `calc(${theme.spacing(7)} + 1px)`;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar />
      <Drawer />
      <Box
        component="main"
        sx={{
          padding: 4,
          width:
            activeBreakpoint === 'mobile'
              ? '100%'
              : `calc(100% - ${drawerWidth})`,
        }}
      >
        <Toolbar />
        {isFetching ? (
          <>
            <Skeleton variant="rectangular" />
            <Skeleton variant="rectangular" />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton variant="rectangular" />
          </>
        ) : badResult ? (
          <Stack alignItems="center">
            <Typography variant="subtitle1">
              {Messages.somethingWrong}
            </Typography>
            <Button
              onClick={handleClick}
              variant="outlined"
              endIcon={<ReplayIcon />}
              sx={{ mt: 1 }}
            >
              {Messages.retry}
            </Button>
          </Stack>
        ) : noKubernetesClusters ? (
          <Typography variant="subtitle1">
            {Messages.noKubernetesClusters}
          </Typography>
        ) : (
          <Outlet />
        )}
        <WelcomeDialog
          open={openWelcomeDialog}
          closeDialog={handleCloseWelcomeDialog}
        />
      </Box>
    </Box>
  );
};
