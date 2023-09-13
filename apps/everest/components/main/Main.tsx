import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ReplayIcon from '@mui/icons-material/Replay';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { DrawerContext } from '../../contexts/drawer/drawer.context';
import { K8Context } from '../../contexts/kubernetes/kubernetes.context';
import useLocalStorage from '../../hooks/utils/useLocalStorage';
import { AppBar } from '../app-bar/AppBar';
import { Drawer } from '../drawer/Drawer';
import { WelcomeDialog } from '../welcome-dialog/welcome-dialog';
import { Messages } from './Main.messages';

export const Main = () => {
  const theme = useTheme();
  const [openWelcomeDialogLS, setOpenWelcomeDialogLS] = useLocalStorage(
    'welcomeModal',
    true
  );
  const { activeBreakpoint } = useContext(DrawerContext);
  const { clusters } = useContext(K8Context);
  const isFetching = !!clusters?.isFetching;
  const badResult = !!clusters?.isError;
  const noKubernetesClusters = !clusters?.data?.length;

  const handleCloseWelcomeDialog = () => {
    setOpenWelcomeDialogLS(false);
  };

  const handleClick = () => {
    clusters?.refetch();
  };

  const drawerWidth = theme.breakpoints.up('sm')
    ? `calc(${theme.spacing(8)} + 1px)`
    : `calc(${theme.spacing(7)} + 1px)`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(Messages.noKubernetesCommand);
    enqueueSnackbar(Messages.copyToClipboardTooltip, {
      variant: 'success',
    });
  };

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
          <Box
            sx={{
              padding: '20px 60px 20px 60px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <Typography variant="h5">
              {Messages.noKubernetesClusters}
            </Typography>
            <Alert
              severity="info"
              action={
                navigator.clipboard &&
                window.isSecureContext && (
                  <Button
                    color="inherit"
                    size="small"
                    onClick={copyToClipboard}
                    sx={{
                      whiteSpace: 'nowrap',
                      display: 'flex',
                      gap: 1,
                      fontWeight: 600,
                    }}
                  >
                    <ContentCopyIcon /> {Messages.copyCommand}
                  </Button>
                )
              }
            >
              <AlertTitle sx={{ fontWeight: 600 }}>
                {Messages.alertTitle}
              </AlertTitle>
              {Messages.noKubernetesCommand}
            </Alert>
          </Box>
        ) : (
          <Outlet />
        )}
        {openWelcomeDialogLS && (
          <WelcomeDialog
            open={openWelcomeDialogLS}
            closeDialog={handleCloseWelcomeDialog}
          />
        )}
      </Box>
    </Box>
  );
};
