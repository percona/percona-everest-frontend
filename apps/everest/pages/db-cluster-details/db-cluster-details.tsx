import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import {
  Link,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Messages } from './db-cluster-details.messages';
import { DBClusterDetailsTabs } from './db-cluster-details.types';

export const DbClusterDetails = () => {
  const { dbClusterName } = useParams();
  const routeMatch = useMatch('/databases/:dbClusterName/:tabs');
  const navigate = useNavigate();
  const currentTab = routeMatch?.params?.tabs;
  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          mb: 1,
        }}
      >
        <IconButton onClick={() => navigate('/databases')}>
          <ArrowBackIosIcon sx={{ pl: '10px' }} fontSize="large" />
        </IconButton>
        <Typography variant="h4">{dbClusterName}</Typography>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
        <Tabs
          value={currentTab}
          variant="scrollable"
          allowScrollButtonsMobile
          aria-label="nav tabs"
        >
          {Object.keys(DBClusterDetailsTabs).map((item) => (
            <Tab
              label={Messages[item]}
              key={DBClusterDetailsTabs[item]}
              value={DBClusterDetailsTabs[item]}
              to={DBClusterDetailsTabs[item]}
              component={Link}
            />
          ))}
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
};
