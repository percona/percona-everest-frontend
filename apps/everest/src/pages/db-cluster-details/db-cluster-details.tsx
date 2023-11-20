import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  Box,
  IconButton,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useDbClusters } from 'hooks/api/db-clusters/useDbClusters';
import { NoMatch } from '../404/NoMatch';
import { DbActionButton } from './db-action-button';
import { Messages } from './db-cluster-details.messages';
import { DBClusterDetailsTabs } from './db-cluster-details.types';

export const DbClusterDetails = () => {
  const { dbClusterName } = useParams();
  const [routeFound, setRouteFound] = useState(true);
  const { data = [], isLoading } = useDbClusters();
  const routeMatch = useMatch('/databases/:dbClusterName/:tabs');
  const navigate = useNavigate();
  const currentTab = routeMatch?.params?.tabs;

  useEffect(() => {
    if (!isLoading) {
      const dbNameExists = data.find(
        (cluster) => cluster.metadata.name === dbClusterName
      );

      if (!dbNameExists) {
        setRouteFound(false);
      }
    }
  }, [isLoading, data, dbClusterName]);

  if (isLoading) {
    return (
      <>
        <Skeleton variant="rectangular" />
        <Skeleton variant="rectangular" />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton variant="rectangular" />
      </>
    );
  }

  if (!routeFound) {
    return <NoMatch />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <IconButton onClick={() => navigate('/databases')}>
            <ArrowBackIosIcon sx={{ pl: '10px' }} fontSize="large" />
          </IconButton>
          <Typography variant="h4">{dbClusterName}</Typography>
        </Box>
        <DbActionButton />
      </Box>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mb: 1,
          width: 'fit-content',
        }}
      >
        <Tabs
          value={currentTab}
          variant="scrollable"
          allowScrollButtonsMobile
          aria-label="nav tabs"
        >
          {Object.keys(DBClusterDetailsTabs).map((item) => (
            <Tab
              // @ts-ignore
              label={Messages[item]}
              // @ts-ignore
              key={DBClusterDetailsTabs[item]}
              // @ts-ignore
              value={DBClusterDetailsTabs[item]}
              // @ts-ignore
              to={DBClusterDetailsTabs[item]}
              component={Link}
              data-testid={`${
                DBClusterDetailsTabs[item as DBClusterDetailsTabs]
              }`}
            />
          ))}
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
};
