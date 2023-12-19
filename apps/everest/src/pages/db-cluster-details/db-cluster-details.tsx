import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  Box,
  IconButton,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useDbClusters } from 'hooks/api/db-clusters/useDbClusters';
import { useEffect, useState } from 'react';
import {
  Link,
  Outlet,
  useMatch,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { NoMatch } from '../404/NoMatch';
import { DbActionButton } from './db-action-button';
import { Messages } from './db-cluster-details.messages';
import { DBClusterDetailsTabs } from './db-cluster-details.types';
import { DbCluster } from 'shared-types/dbCluster.types';

export const DbClusterDetails = () => {
  const { dbClusterName } = useParams();
  const [dbCluster, setDbCluster] = useState<DbCluster | null>();
  const { data = [], isLoading } = useDbClusters();
  const routeMatch = useMatch('/databases/:dbClusterName/:tabs');
  const navigate = useNavigate();
  const currentTab = routeMatch?.params?.tabs;

  useEffect(() => {
    if (!isLoading) {
      const cluster = data.find(
        (cluster) => cluster.metadata.name === dbClusterName
      );

      setDbCluster(cluster ? cluster : null);
    }
  }, [isLoading, data, dbClusterName]);

  // Either loading or we're still searching through the array
  if (isLoading || dbCluster === undefined) {
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

  // We went through the array and know the cluster is not there. Safe to show 404
  if (dbCluster === null) {
    return <NoMatch />;
  }

  // All clear, show the cluster data
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
        {/* At this point, loading is done and we either have the cluster or not */}
        <DbActionButton dbCluster={dbCluster!} />
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
