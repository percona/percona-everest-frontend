import {
  BorderColor,
  DeleteOutline,
  PauseCircleOutline,
  RestartAlt,
} from '@mui/icons-material';
import { Box, MenuItem, Stack } from '@mui/material';
import { Table } from '@percona/ui-lib.table';
import { type MRT_ColumnDef } from 'material-react-table';
import React, { useMemo } from 'react';
import { DbCluster } from '../../hooks/db-clusters/dbCluster.type';
import { useDbClusters } from '../../hooks/db-clusters/useDbClusters';
import { Messages } from './dbClusterView.messages';
import { DbClusterViewProps } from './dbClusterView.type';
import { DbTypeIconProvider } from './dbTypeIconProvider/DbTypeIconProvider';
import { ExpandedRow } from './expandedRow/ExpandedRow';
import { StatusProvider } from './statusProvider/StatusProvider';

export const DbClusterView = ({ customHeader }: DbClusterViewProps) => {
  const { combinedData, loadingAllClusters } = useDbClusters();

  const columns = useMemo<MRT_ColumnDef<DbCluster>[]>(
    () => [
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ row }) => (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <StatusProvider status={row.original?.status} />
          </Stack>
        ),
      },
      {
        accessorKey: 'databaseName',
        header: 'Database name',
      },
      {
        accessorFn: (row) => `${row.dbType}_${row.dbVersion}`,
        header: 'Technology',
        id: 'technology',
        Cell: ({ row }) => (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <DbTypeIconProvider dbType={row.original?.dbType} />
            {row.original?.dbVersion}
          </Stack>
        ),
      },
      {
        accessorKey: 'backupsEnabled',
        header: 'Backups',
        Cell: ({ cell }) => (cell.getValue() ? 'Enabled' : 'Disabled'),
      },
      { accessorKey: 'kubernetesCluster', header: 'Kubernetes Cluster' },
    ],
    []
  );
  return (
    <Stack direction="column" alignItems="center">
      <Box sx={{ width: '100%' }}>
        <Table
          state={{ isLoading: loadingAllClusters }}
          columns={columns}
          data={combinedData}
          enableRowActions
          renderRowActionMenuItems={({ table, row }) => [
            <MenuItem
              onClick={() => {}}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <BorderColor fontSize="small" /> {Messages.menuItems.edit}
            </MenuItem>,
            <MenuItem
              onClick={() => {}}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <DeleteOutline /> {Messages.menuItems.delete}
            </MenuItem>,
            <MenuItem
              onClick={() => {}}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <RestartAlt /> {Messages.menuItems.restart}
            </MenuItem>,
            <MenuItem
              onClick={() => {}}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <PauseCircleOutline /> {Messages.menuItems.suspend}
            </MenuItem>,
          ]}
          renderDetailPanel={({ row }) => <ExpandedRow row={row} />}
          renderTopToolbarCustomActions={() => customHeader}
        />
      </Box>
    </Stack>
  );
};
