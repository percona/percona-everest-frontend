import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Alert,
  Box,
  Button,
  Link,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
        padding: '52px 212px 52px 212px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ mb: '24px' }} variant="h5">
        {Messages.noKubernetesClusters}
      </Typography>
      <List
        sx={{
          listStyleType: 'decimal',
          pt: 0,
          '& .MuiListItem-root': {
            display: 'list-item',
            pt: 0,
            pb: 0,
          },
        }}
      >
        <ListItem>
          <Typography variant="body2">
            {Messages.firstLine1}
            <Link href="https://github.com/percona/percona-everest-cli/releases">
              {Messages.firstLineLink}
            </Link>
            {Messages.firstLine2}
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">{Messages.secondLine}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">{Messages.thirdLine}</Typography>
        </ListItem>
        <ListItem>
          <Typography variant="body2">{Messages.forthLine}</Typography>
        </ListItem>
      </List>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mx: 2 }}>
        <Alert
          severity="info"
          icon={false}
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
          {Messages.noKubernetesCommand}
        </Alert>
        <Typography variant="caption">{Messages.caption}</Typography>
      </Box>
    </Box>
  ) : (
    <DbClusterView
      customHeader={
        <Button
          size="small"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/databases/new"
          variant="contained"
        >
          {Messages.createDatabase}
        </Button>
      }
    />
  );
};
