// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* eslint-disable react/prop-types */
import {
  BorderColor,
  DeleteOutline,
  PauseCircleOutline,
  PlayArrowOutlined,
} from '@mui/icons-material';
import { Box, Button, MenuItem, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Table } from '@percona/ui-lib.table';
import { type MRT_ColumnDef } from 'material-react-table';
import { enqueueSnackbar } from 'notistack';
import React, { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteDbCluster } from '../../hooks/api/db-cluster/useDeleteDbCluster';
import { usePausedDbCluster } from '../../hooks/api/db-cluster/usePausedDbCluster';
import { useRestartDbCluster } from '../../hooks/api/db-cluster/useRestartDbCluster';
import { DbClusterTableElement } from '../../hooks/api/db-clusters/dbCluster.type';
import {
  DB_CLUSTERS_QUERY_KEY,
  ExtraDbCluster,
  useDbClusters,
} from '../../hooks/api/db-clusters/useDbClusters';
import { useSelectedKubernetesCluster } from '../../hooks/api/kubernetesClusters/useSelectedKubernetesCluster';
import { DbClusterStatus } from '../../types/dbCluster.types';
import { DbEngineType } from '../../types/dbEngines.types';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { StatusField } from '../status-field/status-field';
import { DB_CLUSTER_STATUS_TO_BASE_STATUS } from './DbClusterView.constants';
import { Messages } from './dbClusterView.messages';
import { beautifyDbClusterStatus } from './DbClusterView.utils';
import { DbTypeIconProvider } from './dbTypeIconProvider/DbTypeIconProvider';
import { ExpandedRow } from './expandedRow/ExpandedRow';

export const DbClusterView = () => {
  const [selectedDbCluster, setSelectedDbCluster] = useState<string>('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const {
    combinedDataForTable,
    loadingAllClusters,
    combinedDbClusters,
    errorInAllClusters,
  } = useDbClusters();
  const { mutate: deleteDbCluster, isLoading: deletingCluster } =
    useDeleteDbCluster();
  const { mutate: suspendDbCluster } = usePausedDbCluster();
  const { mutate: restartDbCluster } = useRestartDbCluster();
  const { id: k8sClusterId } = useSelectedKubernetesCluster();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isPaused = (status: DbClusterStatus) =>
    status === DbClusterStatus.paused || status === DbClusterStatus.pausing;

  const handleDbSuspendOrResumed = (
    status: DbClusterStatus,
    dbClusterName: string
  ) => {
    const shouldBePaused = !isPaused(status);
    const dbCluster = combinedDbClusters.find(
      (item) => item.metadata.name === dbClusterName
    );
    if (dbCluster) {
      suspendDbCluster(
        { shouldBePaused, k8sClusterId, dbCluster },
        {
          onSuccess: (updatedObject) => {
            queryClient.setQueryData(
              [DB_CLUSTERS_QUERY_KEY, k8sClusterId],
              (oldData?: ExtraDbCluster[]) =>
                oldData.map((value) =>
                  value.dbCluster.metadata.name === updatedObject.metadata.name
                    ? {
                        dbCluster: updatedObject,
                        k8sClusterName: value.k8sClusterName,
                      }
                    : value
                )
            );
            enqueueSnackbar(
              shouldBePaused
                ? Messages.responseMessages.pause
                : Messages.responseMessages.resume,
              {
                variant: 'success',
              }
            );
          },
        }
      );
    }
  };

  const handleDbRestart = (dbClusterName: string) => {
    const dbCluster = combinedDbClusters.find(
      (item) => item.metadata.name === dbClusterName
    );
    if (dbCluster) {
      restartDbCluster(
        { k8sClusterId, dbCluster },
        {
          onSuccess: (updatedObject) => {
            queryClient.setQueryData(
              [DB_CLUSTERS_QUERY_KEY, k8sClusterId],
              (oldData?: ExtraDbCluster[]) =>
                oldData.map((value) =>
                  value.dbCluster.metadata.name === updatedObject.metadata.name
                    ? {
                        dbCluster: updatedObject,
                        k8sClusterName: value.k8sClusterName,
                      }
                    : value
                )
            );
            enqueueSnackbar(Messages.responseMessages.restart, {
              variant: 'success',
            });
          },
        }
      );
    }
  };

  const handleDeleteDbCluster = (dbClusterName: string) => {
    setSelectedDbCluster(dbClusterName);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = (dbClusterName: string) => {
    deleteDbCluster(
      { k8sClusterId, dbClusterName },
      {
        onSuccess: (_, variables) => {
          queryClient.setQueryData(
            [DB_CLUSTERS_QUERY_KEY, k8sClusterId],
            (oldData?: ExtraDbCluster[]) =>
              (oldData || []).filter(
                (value) =>
                  value.dbCluster.metadata.name !== variables.dbClusterName
              )
          );
          handleCloseDeleteDialog();
        },
      }
    );
  };

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
        Cell: ({ cell }) => (
          <StatusField
            dataTestId={cell?.row?.original?.databaseName}
            status={cell.getValue<DbClusterStatus>()}
            statusMap={DB_CLUSTER_STATUS_TO_BASE_STATUS}
          >
            {beautifyDbClusterStatus(cell.getValue<DbClusterStatus>())}
          </StatusField>
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
      // {
      //   accessorKey: 'backupsEnabled',
      //   header: 'Backups',
      //   filterVariant: 'checkbox',
      //   accessorFn: (row) => (row.backupsEnabled ? 'true' : 'false'),
      //   Cell: ({ cell }) =>
      //     cell.getValue() === 'true' ? 'Enabled' : 'Disabled',
      // },
      // {
      //   accessorKey: 'kubernetesCluster',
      //   header: 'Kubernetes Cluster',
      // },
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
          data={combinedDataForTable}
          enableRowActions
          renderRowActionMenuItems={({ row, closeMenu }) => [
            // TODO: finish when design is ready
            <MenuItem
              key={0}
              component={Link}
              to="/databases/edit"
              state={{ selectedDbCluster: row.original.databaseName! }}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <BorderColor fontSize="small" /> {Messages.menuItems.edit}
            </MenuItem>,
            <MenuItem
              data-testid={`${row.original?.databaseName}-delete`}
              key={1}
              onClick={() => {
                handleDeleteDbCluster(row.original.databaseName!);
                closeMenu();
              }}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <DeleteOutline /> {Messages.menuItems.delete}
            </MenuItem>,
            <MenuItem
              key={2}
              onClick={() => {
                handleDbRestart(row.original.databaseName);
                closeMenu();
              }}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <PlayArrowOutlined /> {Messages.menuItems.restart}
            </MenuItem>,
            <MenuItem
              key={3}
              disabled={row.original.status === DbClusterStatus.pausing}
              onClick={() => {
                handleDbSuspendOrResumed(
                  row.original.status,
                  row.original.databaseName
                );
                closeMenu();
              }}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <PauseCircleOutline />{' '}
              {isPaused(row.original.status)
                ? Messages.menuItems.resume
                : Messages.menuItems.suspend}
            </MenuItem>,
          ]}
          renderDetailPanel={({ row }) => <ExpandedRow row={row} />}
          muiTableBodyRowProps={({ row, isDetailPanel }) => ({
            onClick: () => {
              !isDetailPanel && navigate(`/databases/${row.original.databaseName}/overview`);
            },
            sx: {
              ...(!isDetailPanel && {
                cursor: 'pointer', // you might want to change the cursor too when adding an onClick
              })
            },
          })}
          renderTopToolbarCustomActions={() => (
            <Button
              size="small"
              startIcon={<AddIcon />}
              component={Link}
              to="/databases/new"
              variant="contained"
              disabled={errorInAllClusters}
              data-testid="add-db-cluster-button"
            >
              {Messages.createDatabase}
            </Button>
          )}
          hideExpandAllIcon
        />
      </Box>
      {openDeleteDialog && (
        <ConfirmDialog
          isOpen={openDeleteDialog}
          selectedId={selectedDbCluster}
          closeModal={handleCloseDeleteDialog}
          headerMessage={Messages.deleteModal.header}
          handleConfirm={handleConfirmDelete}
          disabledButtons={deletingCluster}
        >
          {Messages.deleteModal.content}
        </ConfirmDialog>
      )}
    </Stack>
  );
};
