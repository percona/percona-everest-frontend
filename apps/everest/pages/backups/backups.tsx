import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { useRouteMatch } from '../../hooks/settings/useRouteMatch';
import { Messages } from './backups.messages';
import { BackupsTabs } from './backups.types';

export const Backups = () => {
  const { dbClusterName } = useParams();
  const routeMatch = useRouteMatch([`/databases/:dbClusterName/:tabs`]);
  const currentTab = routeMatch?.params?.tabs;
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
        }}
      >
        <IconButton LinkComponent={Link} href="databases">
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h4">{dbClusterName}</Typography>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          variant="scrollable"
          allowScrollButtonsMobile
          aria-label="nav tabs"
        >
          {Object.keys(BackupsTabs).map((item) => (
            <Tab
              label={Messages[item]}
              key={BackupsTabs[item]}
              value={BackupsTabs[item]}
              to={BackupsTabs[item]}
              component={Link}
            />
          ))}
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
};
