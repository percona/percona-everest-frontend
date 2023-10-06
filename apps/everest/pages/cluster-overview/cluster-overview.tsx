import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import React from 'react'
import { useDbCluster } from '../../hooks/api/db-cluster/useDbCluster';
import { dbEngineToDbType } from '../../utils/db';
import { ProxyExposeType } from '../../types/dbCluster.types';
import { useDbClusterCredentials } from '../../hooks/api/db-cluster/useCreateDbCluster';
import { DatabaseDetails, ConnectionDetails } from './cards';

export const ClusterOverview = () => {
  const { dbClusterName } = useParams();

  const { data: dbCluster, isFetching: fetchingCluster } = useDbCluster(dbClusterName || '', !!dbClusterName);
  const { data: dbClusterDetails, isFetching: fetchingClusterDetails } = useDbClusterCredentials(dbClusterName || '');

  return (
    <Stack
      direction='row'
      flexWrap='wrap'
      useFlexGap
      spacing={2}
      sx={{
        '& > *': {
          flexGrow: 1,
        }
      }}
    >
      {/* We force ! because while loading no info is shown */}
      <DatabaseDetails
        loading={fetchingCluster}
        type={dbEngineToDbType(dbCluster?.spec.engine.type!)}
        name={dbCluster?.metadata.name!}
        namespace={dbCluster?.metadata.namespace!}
        version={dbCluster?.spec.engine.version!}
        numberOfNodes={dbCluster?.spec.engine.replicas!}
        cpu={dbCluster?.spec.engine.resources?.cpu!}
        externalAccess={dbCluster?.spec.proxy.expose.type === ProxyExposeType.external}
        monitoring={!!dbCluster?.spec.monitoring.monitoringConfigName}
      />
      <ConnectionDetails
        loading={fetchingCluster}
        loadingClusterDetails={fetchingClusterDetails}
        hostname={dbCluster?.status?.hostname!}
        port={dbCluster?.status?.port!}
        username={dbClusterDetails?.username!}
        password={dbClusterDetails?.password!}
      />
    </Stack>
  );
}