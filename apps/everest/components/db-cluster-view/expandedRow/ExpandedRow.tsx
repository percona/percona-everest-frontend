import { Box, Typography } from '@mui/material';
import { MRT_Row } from 'material-react-table';
import React from 'react';
import { DbCluster } from '../../../hooks/db-clusters/dbCluster.type';
import { LabelValue } from './LabelValue';

export const ExpandedRow = ({ row }: { row: MRT_Row<DbCluster> }) => {
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
          Connection
        </Typography>
        <LabelValue label="Host" value="bla" />
        <LabelValue label="Port" value="bla" />
        <LabelValue label="Username" value="bla" />
        <LabelValue label="Password" value="bla" />
      </Box>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 'bold', paddingBottom: 1 }}
        >
          Db Cluster parameters
        </Typography>
        <LabelValue label="K8s Cluster Name" value="bla" />
        <LabelValue label="CPU" value="bla" />
        <LabelValue label="Memory" value="bla" />
        <LabelValue label="Disk" value="bla" />
        <LabelValue label="External Access" value="bla" />
      </Box>
    </Box>
  );
};
