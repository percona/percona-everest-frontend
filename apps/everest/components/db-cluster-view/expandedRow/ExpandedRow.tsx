import { Box, Skeleton, Typography } from '@mui/material';
import { MRT_Row } from 'material-react-table';
import React from 'react';
import { DbClusterTableElement } from '../../../hooks/api/db-clusters/dbCluster.type';
import { ProxyExposeType } from '../../../types/dbCluster.types';
import { Messages } from '../dbClusterView.messages';
import { LabelValue } from './LabelValue';
import { useDbClusterCredentials } from "../../../hooks/api/db-cluster/useCreateDbCluster";

export const ExpandedRow = ({
  row,
}: {
  row: MRT_Row<DbClusterTableElement>;
}) => {
  const {
    cpu,
    kubernetesCluster,
    memory,
    storage,
    exposetype,
    databaseName,
    hostName,
    port,
  } = row.original;
  const isExpanded = row.getIsExpanded();
  const { isLoading, isFetching, data } = useDbClusterCredentials(
    databaseName,
    {
      enabled: !!isExpanded,
      staleTime: 10 * (60 * 1000),
      cacheTime: 15 * (60 * 1000),
    }
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        gap: '50px',
      }}
    >
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 'bold', paddingBottom: 1 }}
        >
          {Messages.expandedRow.connection}
        </Typography>
        <LabelValue label="Host" value={hostName} />
        <LabelValue label="Port" value={port} />
        {isLoading || isFetching ? (
          <>
            <Skeleton width="300px" />
            <Skeleton width="300px" />
          </>
        ) : (
          <>
            <LabelValue label="Username" value={data?.username} />
            <LabelValue label="Password" value={data?.password} />
          </>
        )}
      </Box>

      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 'bold', paddingBottom: 1 }}
        >
          {Messages.expandedRow.dbClusterParams}
        </Typography>
        <LabelValue
          label={Messages.expandedRow.k8sCluster}
          value={kubernetesCluster}
        />
        <LabelValue label={Messages.expandedRow.cpu} value={cpu} />
        <LabelValue label={Messages.expandedRow.memory} value={memory} />
        <LabelValue label={Messages.expandedRow.disk} value={storage} />
        <LabelValue
          label={Messages.expandedRow.externalAccess}
          value={
            exposetype === ProxyExposeType.external
              ? Messages.expandedRow.enabled
              : Messages.expandedRow.disabled
          }
        />
      </Box>
    </Box>
  );
};
