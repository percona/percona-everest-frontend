import { Box, MenuItem, Stack } from '@mui/material';
import { Table } from '@percona/ui-lib.table';
import { type MRT_ColumnDef } from 'material-react-table';
import React, { useMemo } from 'react';
import { DbCluster } from '../../hooks/db-clusters/dbCluster.type';
import { useDbClusters } from '../../hooks/db-clusters/useDbClusters';
import { DbClusterViewProps } from './dbClusterView.type';
import { DbTypeIconProvider } from './dbTypeIconProvider/DbTypeIconProvider';
import { ExpandedRow } from './expandedRow/ExpandedRow';
import { StatusProvider } from './statusProvider/StatusProvider';

export const DbClusterView = ({ customHeader }: DbClusterViewProps) => {
  const { combinedData, loadingAllClusters, errorInSomeClusters } =
    useDbClusters();

  const columns = useMemo<MRT_ColumnDef<DbCluster>[]>(
    () => [
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ cell, row }) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
                gap: 1,
              }}
            >
              <StatusProvider status={row.original?.status} />
            </Box>
          );
        },
      },
      {
        accessorKey: 'databaseName',
        header: 'Database name',
      },
      {
        accessorFn: (row) => row.dbTypeIcon + '_' + row.dbVersion,
        header: 'Technology',
        id: 'technology',
        Cell: ({ cell, row }) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
                gap: 1,
              }}
            >
              <DbTypeIconProvider dbType={row.original?.dbTypeIcon} />
              {row.original?.dbVersion}
            </Box>
          );
        },
      },
      {
        accessorKey: 'backupsEnabled',
        header: 'Backups',
        Cell: ({ cell }) => {
          return cell.getValue() ? 'Enabled' : 'Disabled';
        },
      },
      { accessorKey: 'kubernetesCluster', header: 'Kubernetes Cluster' },
    ],
    []
  );
  return (
    <Stack direction="column" alignItems="center">
      <Box sx={{ width: '100%' }}>
        <Table
          columns={columns}
          data={combinedData}
          enableRowActions
          renderRowActionMenuItems={({ closeMenu, table, row }) => [
            <MenuItem
              key={0}
              onClick={() => {
                table.setEditingRow(row);
              }}
              sx={{ m: 0 }}
            >
              Edit
            </MenuItem>,
            <MenuItem key={1} onClick={() => {}} sx={{ m: 0 }}>
              Delete
            </MenuItem>,
          ]}
          renderDetailPanel={({ row }) => <ExpandedRow row={row} />}
          renderTopToolbarCustomActions={() => customHeader}
        />
      </Box>
    </Stack>
  );
};
