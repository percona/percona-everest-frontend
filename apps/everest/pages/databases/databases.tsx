import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DbClusterView } from '../../components/db-cluster-view/DbClusterView';
import { K8Context } from '../../contexts/kubernetes/kubernetes.context';
import { Messages } from './databases.messages';

export const DatabasesPage = () => {
  const { clusters } = useContext(K8Context);
  const noKubernetesClusters = !clusters?.data?.length;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(Messages.noKubernetesCommand);
    enqueueSnackbar(Messages.copyToClipboardTooltip, {
      variant: 'success',
    });
  };

  return noKubernetesClusters ? (
    <Box
      sx={{
        padding: '20px 60px 20px 60px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <Typography variant="h5">{Messages.noKubernetesClusters}</Typography>
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
        <AlertTitle sx={{ fontWeight: 600 }}>{Messages.alertTitle}</AlertTitle>
        {Messages.noKubernetesCommand}
      </Alert>
    </Box>
  ) : (
    <DbClusterView
      customHeader={
        <Button
          size="small"
          startIcon={<AddIcon />}
          component={Link}
          to="/databases/new"
          variant="contained"
        >
          {Messages.createDatabase}
        </Button>
      }
    />
  );
};
