import { Box, Typography } from '@mui/material';
import { MRT_Row } from 'material-react-table';
import React from 'react';
import {
  DbClusterTableElement,
} from '../../../hooks/api/db-clusters/dbCluster.type';
import { ProxyExposeType } from '../../../types/dbCluster.types';
import { Messages } from '../dbClusterView.messages';
import { LabelValue } from './LabelValue';

export const ExpandedRow = ({ row }: { row: MRT_Row<DbClusterTableElement> }) => {
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
