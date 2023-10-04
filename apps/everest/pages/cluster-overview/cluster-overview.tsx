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
import { Messages } from './cluster-overview.messages';

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
        title={Messages.titles.dbDetails}
        dataTestId='database-details'
        content={
          <Grid container spacing={2}>
            <OverviewSection title={Messages.titles.basicInformation} loading={fetchingCluster}>
              <OverviewSectionText>{Messages.fields.type(beautifyDbTypeName(dbEngineToDbType(dbCluster?.spec.engine.type!)))}</OverviewSectionText>
              <OverviewSectionText>{Messages.fields.name(dbCluster?.metadata.name)}</OverviewSectionText>
              <OverviewSectionText>{Messages.fields.namespace(dbCluster?.metadata.namespace)}</OverviewSectionText>
              <OverviewSectionText>{Messages.fields.version(dbCluster?.spec.engine.version)}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title={Messages.titles.resources} loading={fetchingCluster}>
              <OverviewSectionText>{Messages.fields.numberOfNodes(dbCluster?.spec.engine.replicas)}</OverviewSectionText>
              <OverviewSectionText>{Messages.fields.cpu(dbCluster?.spec.engine.resources?.cpu)}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title={Messages.titles.externalAccess} loading={fetchingCluster}>
              <OverviewSectionText>{dbCluster?.spec.proxy.expose.type === ProxyExposeType.external ? Messages.fields.enabled : Messages.fields.disabled}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title={Messages.titles.monitoring} loading={fetchingCluster}>
              <OverviewSectionText>{dbCluster?.spec.monitoring.monitoringConfigName ? Messages.fields.enabled : Messages.fields.disabled}</OverviewSectionText>
            </OverviewSection>
          </Grid>
        }
      />
      <Card
        title={Messages.titles.connectionDetails}
        dataTestId='connection-details'
        content={
          <Grid container spacing={2}>
            <OverviewSection title={Messages.titles.host} loading={fetchingCluster}>
              <OverviewSectionText>{dbCluster?.status?.hostname}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title={Messages.titles.port} loading={fetchingCluster}>
              <OverviewSectionText>{dbCluster?.status?.port}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title={Messages.titles.username} loading={fetchingClusterDetails}>
              <OverviewSectionText>{dbClusterDetails?.username}</OverviewSectionText>
            </OverviewSection>
            <OverviewSection title={Messages.titles.password} loading={fetchingClusterDetails}>
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