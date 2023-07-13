import { Box, MenuItem, Stack } from '@mui/material';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
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
        <MaterialReactTable
          state={{ isLoading: loadingAllClusters }}
          layoutMode="grid"
          columns={columns}
          data={combinedData}
          enablePagination={combinedData.length > 10}
          enableBottomToolbar={combinedData.length > 10}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          enableRowActions
          positionActionsColumn="last"
          positionExpandColumn="last"
          muiTablePaperProps={{ elevation: 0 }}
          muiTopToolbarProps={{
            sx: {
              '& .MuiBox-root': {
                flexDirection: 'row-reverse',
              },
            },
          }}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              size: 30,
              header: '',
              muiTableBodyCellProps: { sx: { flex: 'none', width: '60px' } },
              muiTableHeadCellProps: { sx: { flex: 'none', width: '60px' } },
            },
            'mrt-row-expand': {
              size: 40,
              muiTableBodyCellProps: { sx: { flex: 'none', width: '60px' } },
              muiTableHeadCellProps: { sx: { flex: 'none', width: '60px' } },
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
