/* eslint-disable react/prop-types */
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
import { useNavigate } from 'react-router-dom';
import { DbClusterTableElement } from '../../hooks/api/db-clusters/dbCluster.type';
import { useDbClusters } from '../../hooks/api/db-clusters/useDbClusters';
import { DbClusterStatus } from '../../types/dbCluster.types';
import { DbEngineType } from '../../types/dbEngines.types';
import { Messages } from './dbClusterView.messages';
import { DbClusterViewProps } from './dbClusterView.type';
import { beautifyDbClusterStatus } from './DbClusterView.utils';
import { DbTypeIconProvider } from './dbTypeIconProvider/DbTypeIconProvider';
import { ExpandedRow } from './expandedRow/ExpandedRow';
import { StatusProvider } from './statusProvider/StatusProvider';

export const DbClusterView = ({ customHeader }: DbClusterViewProps) => {
  const navigate = useNavigate();
  const { combinedData, loadingAllClusters } = useDbClusters();

  const columns = useMemo<MRT_ColumnDef<DbClusterTableElement>[]>(
    () => [
      {
        accessorKey: 'status',
        header: 'Status',
        filterVariant: 'multi-select',
        filterSelectOptions: Object.values(DbClusterStatus).map((status) => ({
          text: beautifyDbClusterStatus(status),
          value: status,
        })),
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
        accessorFn: ({ dbType }) => dbType,
        filterVariant: 'multi-select',
        filterSelectOptions: Object.values(DbEngineType),
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
        filterVariant: 'checkbox',
        accessorFn: (row) => (row.backupsEnabled ? 'true' : 'false'),
        Cell: ({ cell }) =>
          cell.getValue() === 'true' ? 'Enabled' : 'Disabled',
      },
      {
        accessorKey: 'kubernetesCluster',
        header: 'Kubernetes Cluster',
      },
    ],
    []
  );
  return (
    <Stack direction="column" alignItems="center">
      <Box sx={{ width: '100%' }}>
        <Table
          noDataMessage={Messages.dbCluster.noData}
          state={{ isLoading: loadingAllClusters }}
          columns={columns}
          data={combinedData}
          enableRowActions
          renderRowActionMenuItems={() => [
            // TODO: finish when design is ready
            <MenuItem
              key={0}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <BorderColor fontSize="small" /> {Messages.menuItems.edit}
            </MenuItem>,
            <MenuItem
              key={1}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <DeleteOutline /> {Messages.menuItems.delete}
            </MenuItem>,
            <MenuItem
              key={2}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <RestartAlt /> {Messages.menuItems.restart}
            </MenuItem>,
            <MenuItem
              key={3}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <PauseCircleOutline /> {Messages.menuItems.suspend}
            </MenuItem>,
          ]}
          renderDetailPanel={({ row }) => <ExpandedRow row={row} />}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              navigate(`/databases/${row.original.databaseName}/backups`);
            },
            sx: {
              cursor: 'pointer', //you might want to change the cursor too when adding an onClick
            },
          })}
          renderTopToolbarCustomActions={() => customHeader}
          hideExpandAllIcon
        />
      </Box>
    </Stack>
  );
};
