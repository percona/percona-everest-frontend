import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDbClusterCredentials } from 'hooks/api/db-cluster/useCreateDbCluster';
import { useDbCluster } from 'hooks/api/db-cluster/useDbCluster';
import { useDbClusters } from 'hooks/api/db-clusters/useDbClusters';
import { ProxyExposeType } from 'shared-types/dbCluster.types';
import { dbEngineToDbType } from '@percona/utils';
import { ConnectionDetails, DatabaseDetails } from './cards';

export const ClusterOverview = () => {
  const { dbClusterName } = useParams();
  const { combinedDataForTable, loadingAllClusters } = useDbClusters();
  const dbNameExists = combinedDataForTable.find(
    (cluster) => cluster.databaseName === dbClusterName
  );
  const { data: dbCluster, isFetching: fetchingCluster } = useDbCluster(
    dbClusterName || '',
    {
      enabled: !!dbClusterName && !!dbNameExists,
    }
  );
  const { data: dbClusterDetails, isFetching: fetchingClusterDetails } =
    useDbClusterCredentials(dbClusterName || '', {
      enabled: !!dbClusterName && !!dbNameExists,
    });

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      useFlexGap
      spacing={2}
      sx={{
        '& > *': {
          flexGrow: 1,
        },
      }}
    >
      {/* We force ! because while loading no info is shown */}
      <DatabaseDetails
        loading={fetchingCluster || loadingAllClusters}
        type={dbEngineToDbType(dbCluster?.spec.engine.type!)}
        name={dbCluster?.metadata.name!}
        namespace={dbCluster?.metadata.namespace!}
        version={dbCluster?.spec.engine.version!}
        numberOfNodes={dbCluster?.spec.engine.replicas!}
        cpu={dbCluster?.spec.engine.resources?.cpu!}
        memory={dbCluster?.spec.engine.resources?.memory!}
        disk={dbCluster?.spec.engine.storage.size!}
        externalAccess={
          dbCluster?.spec.proxy.expose.type === ProxyExposeType.external
        }
        monitoring={!!dbCluster?.spec.monitoring.monitoringConfigName}
      />
      <ConnectionDetails
        loading={fetchingCluster}
        loadingClusterDetails={fetchingClusterDetails || loadingAllClusters}
        hostname={dbCluster?.status?.hostname}
        port={dbCluster?.status?.port!}
        username={dbClusterDetails?.username!}
        password={dbClusterDetails?.password!}
      />
    </Stack>
  );
};
