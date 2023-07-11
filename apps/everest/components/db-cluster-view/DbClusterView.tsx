import { Box, MenuItem, Stack, Typography } from '@mui/material';
import {
  MongoLeafIcon,
  MySqlDolphinIcon,
  PostgreSqlElephantIcon,
} from '@percona/ui-lib.icons.db';
import { ErrorIcon } from '@percona/ui-lib.status';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableInstance,
} from 'material-react-table';
import React, { ReactNode, useCallback, useMemo, useRef } from 'react';
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

  const iconProvider = useCallback((dbType: string) => {
    switch (dbType) {
      case 'pxc':
        return <MySqlDolphinIcon />;
      case 'psmdb':
        return <MongoLeafIcon />;
      case 'postgresql':
        return <PostgreSqlElephantIcon />;
      default:
        return null;
    }
  }, []);

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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
                gap: 1,
              }}
            >
              {iconProvider(row.original?.dbTypeIcon)} {row.original?.dbVersion}
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
      <Typography variant="h5">Databases</Typography>
      <ErrorIcon size="large" />
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
