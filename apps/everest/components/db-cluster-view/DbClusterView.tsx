import { Box, MenuItem, Stack, Typography } from '@mui/material';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableInstance,
} from 'material-react-table';
import React, { ReactNode, useMemo, useRef } from 'react';
import { DbCluster } from '../../hooks/db-clusters/dbCluster.type';
import { useDbClusters } from '../../hooks/db-clusters/useDbClusters';
import { ExpandedRow } from './expandedRow/ExpandedRow';

export const DbClusterView = ({
  customHeader,
}: {
  customHeader: ReactNode;
}) => {
  const tableInstanceRef = useRef<MRT_TableInstance<DbCluster>>(null);
  const dbClusters = useDbClusters();

  const loading = dbClusters.every((cluster) => cluster.isLoading);

  let combinedData = dbClusters
    .map((cluster) => {
      return cluster?.data ?? [];
    })
    .flat() as DbCluster[];

  const columns = useMemo<MRT_ColumnDef<DbCluster>[]>(
    () => [
      {
        accessorKey: 'status',
        header: 'Status',
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
            <span>
              {row.original?.dbTypeIcon} {row.original?.dbVersion}
            </span>
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
      <Typography variant="h5">Databases</Typography>

      <Box sx={{ width: '100%' }}>
        <MaterialReactTable
          muiTableProps={{
            sx: {
              tableLayout: 'fixed',
            },
          }}
          tableInstanceRef={tableInstanceRef}
          columns={columns}
          data={combinedData}
          enablePagination={combinedData.length > 10}
          enableBottomToolbar={combinedData.length > 10}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          enableRowActions
          positionActionsColumn="last"
          positionExpandColumn="last"
          displayColumnDefOptions={{
            'mrt-row-actions': {
              maxSize: 50,
            },
            'mrt-row-expand': {
              maxSize: 50,
            },
          }}
          renderRowActionMenuItems={({ closeMenu, row }) => [
            <MenuItem key={0} onClick={() => {}} sx={{ m: 0 }}>
              Edit
            </MenuItem>,
            <MenuItem key={1} onClick={() => {}} sx={{ m: 0 }}>
              Delete
            </MenuItem>,
          ]}
          renderTopToolbarCustomActions={() => customHeader}
          renderDetailPanel={({ row }) => <ExpandedRow row={row} />}
        />
      </Box>
    </Stack>
  );
};
