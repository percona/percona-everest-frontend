import { Box, Typography } from '@mui/material';
import { MRT_Row } from 'material-react-table';
import React from 'react';
import {
  DbCluster,
  ProxyExposeType,
} from '../../../hooks/db-clusters/dbCluster.type';
import { Messages } from '../dbClusterView.messages';
import { LabelValue } from './LabelValue';

export const ExpandedRow = ({ row }: { row: MRT_Row<DbCluster> }) => {
  const { cpu, kubernetesCluster, memory, storage, exposetype } = row.original;
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'start',
        gap: '50px',
      }}
    >
      {/* TODO: add ones endpoint for getting those values is created
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 'bold', paddingBottom: 1 }}
        >
          {Messages.expandedRow.connection}
        </Typography>

        <LabelValue label="Host" value={hostName} />
        <LabelValue label="Port" value="bla" />
        <LabelValue label="Username" value="bla" />
        <LabelValue label="Password" value="bla" /> 
      </Box>
      */}
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 'bold', paddingBottom: 1 }}
        >
          {Messages.expandedRow.dbClusterParams}
        </Typography>
        <LabelValue label="K8s Cluster Name" value={kubernetesCluster} />
        <LabelValue label="CPU" value={cpu} />
        <LabelValue label="Memory" value={memory} />
        <LabelValue label="Disk" value={storage} />
        <LabelValue
          label="External Access"
          value={
            exposetype === ProxyExposeType.external ? 'Enabled' : 'Disabled'
          }
        />
      </Box>
    </Box>
  );
};
