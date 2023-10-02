import { Grid, Stack } from '@mui/material';
import { Card } from '@percona/ui-lib.card';
import { useParams } from 'react-router-dom';
import React from 'react'
import { OverviewSection, OverviewSectionText } from './overview-section/overview-section';
import { HiddenPasswordToggle } from '../../components/hidden-row/HiddenPasswordToggle';
import { useDbCluster } from '../../hooks/api/db-cluster/useDbCluster';
import { beautifyDbTypeName, dbEngineToDbType } from '../../utils/db';
import { ProxyExposeType } from '../../types/dbCluster.types';
import { useDbClusterCredentials } from '../../hooks/api/db-cluster/useCreateDbCluster';

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
      <Card
        title='Database details'
        dataTestId='database-details'
        content={
          <Grid container spacing={2}>
            <OverviewSection title='Basic Information' loading={fetchingCluster}>
              <OverviewSectionText>Type: {beautifyDbTypeName(dbEngineToDbType(dbCluster?.spec.engine.type!))}</OverviewSectionText>
              <OverviewSectionText>Name: {dbCluster?.metadata.name}</OverviewSectionText>
              <OverviewSectionText>Namespace: {dbCluster?.metadata.namespace}</OverviewSectionText>
              <OverviewSectionText>Version: {dbCluster?.spec.engine.version}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='Resources' loading={fetchingCluster}>
              <OverviewSectionText>Number of nodes: {dbCluster?.spec.engine.replicas}</OverviewSectionText>
              <OverviewSectionText>CPU: {dbCluster?.spec.engine.resources?.cpu}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='External Access' loading={fetchingCluster}>
              <OverviewSectionText>{dbCluster?.spec.proxy.expose.type === ProxyExposeType.external ? 'Enabled' : 'Disabled'}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='Monitoring' loading={fetchingCluster}>
              <OverviewSectionText>{!!dbCluster?.spec.monitoring.monitoringConfigName ? 'Enabled' : 'Disabled'}</OverviewSectionText>
            </OverviewSection>
          </Grid>
        }
      />
      <Card
        title='Connection details'
        dataTestId='connection-details'
        content={
          <Grid container spacing={2}>
            <OverviewSection title='Connection Details' loading={fetchingCluster}>
              <OverviewSectionText>Host: {dbCluster?.status?.hostname}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='Port' loading={fetchingCluster}>
              <OverviewSectionText>{dbCluster?.status?.port}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='Username' loading={fetchingClusterDetails}>
              <OverviewSectionText>{dbClusterDetails?.username}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title='Password' loading={fetchingClusterDetails}>
              <OverviewSectionText>
                <HiddenPasswordToggle value={dbClusterDetails?.password!} />
              </OverviewSectionText>
            </OverviewSection>
          </Grid>
        }
      />
    </Stack>
  );
}