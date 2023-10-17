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
import { Messages } from './backups.messages';
import { BackupsTabs } from './backups.types';

export const Backups = () => {
  const { dbClusterName } = useParams();
  // TODO: uncomment after checking with Nuna if we want 404 here
  // const [routeFound, setRouteFound] = useState(true);
  // const { combinedDataForTable, loadingAllClusters } = useDbClusters();
  const routeMatch = useMatch('/databases/:dbClusterName/:tabs');
  const navigate = useNavigate();
  const currentTab = routeMatch?.params?.tabs;

  // TODO: uncomment after checking with Nuna if we want 404 here
  // useEffect(() => {
  //   if (!loadingAllClusters) {
  //     const dbNameExists = combinedDataForTable.find(
  //       (cluster) => cluster.databaseName === dbClusterName
  //     );

  //     if (!dbNameExists) {
  //       setRouteFound(false);
  //     }
  //   }
  // }, [loadingAllClusters]);

  // if (loadingAllClusters) {
  //   return <Skeleton />;
  // }

  // if (!routeFound) {
  //   return <NoMatch />;
  // }

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
