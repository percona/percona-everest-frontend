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
import React, { useMemo } from 'react';
import {
    BorderColor,
    DeleteOutline,
    PauseCircleOutline,
    PlayArrowOutlined
} from '@mui/icons-material';
import React, { useMemo } from 'react';
import { Box, MenuItem, Stack } from '@mui/material';
import { Table } from '@percona/ui-lib.table';
import { type MRT_ColumnDef } from 'material-react-table';
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from 'react-query';
import { DbClusterTableElement } from '../../hooks/api/db-clusters/dbCluster.type';
import { DB_CLUSTERS_QUERY_KEY, ExtraDbCluster, useDbClusters } from '../../hooks/api/db-clusters/useDbClusters';
import { Messages } from './dbClusterView.messages';
import { DbClusterViewProps } from './dbClusterView.types';
import { DbTypeIconProvider } from './dbTypeIconProvider/DbTypeIconProvider';
import { ExpandedRow } from './expandedRow/ExpandedRow';
import { DbClusterStatus } from '../../types/dbCluster.types';
import { beautifyDbClusterStatus } from './DbClusterView.utils';
import { DbEngineType } from '../../types/dbEngines.types';
import { useDeleteDbCluster } from '../../hooks/api/db-cluster/useDeleteDbCluster';
import { useSelectedKubernetesCluster } from '../../hooks/api/kubernetesClusters/useSelectedKubernetesCluster';
import { usePausedDbCluster } from '../../hooks/api/db-cluster/usePausedDbCluster';
import { useRestartDbCluster } from '../../hooks/api/db-cluster/useRestartDbCluster';
import { StatusField } from '../status-field/status-field';
import { DB_CLUSTER_STATUS_TO_BASE_STATUS } from './DbClusterView.constants';

export const DbClusterView = ({ customHeader }: DbClusterViewProps) => {
  const { combinedDataForTable, loadingAllClusters, combinedDbClusters } = useDbClusters();
  const { mutate: deleteDbCluster } = useDeleteDbCluster();
  const { mutate: suspendDbCluster } = usePausedDbCluster();
  const { mutate: restartDbCluster } = useRestartDbCluster();
  const { id: k8sClusterId } = useSelectedKubernetesCluster();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isPaused = (status: DbClusterStatus) => status === DbClusterStatus.paused || status === DbClusterStatus.pausing;

  const handleDeleteDbCluster = (dbClusterName: string) => {
      deleteDbCluster({ k8sClusterId, dbClusterName}, {
          onSuccess: (_, variables) => {
              queryClient.setQueryData(
                  [DB_CLUSTERS_QUERY_KEY, k8sClusterId],
                  (oldData?: ExtraDbCluster[]) => (oldData || []).filter((value) => value.dbCluster.metadata.name !== variables.dbClusterName)
              );
          },
      })
  };
    const handleDbSuspendOrResumed = (status: DbClusterStatus, dbClusterName:string) => {
        const shouldBePaused = !isPaused(status);
        const dbCluster = combinedDbClusters.find(item => item.metadata.name===dbClusterName);
        if (dbCluster) {
            suspendDbCluster({shouldBePaused, k8sClusterId, dbCluster}, {
                onSuccess: (updatedObject) => {
                    queryClient.setQueryData(
                        [DB_CLUSTERS_QUERY_KEY, k8sClusterId],
                        (oldData?: ExtraDbCluster[]) => oldData.map(value => value.dbCluster.metadata.name === updatedObject.metadata.name ? {
                                    dbCluster: updatedObject,
                                    k8sClusterName: value.k8sClusterName,
                                }: value)
                    )
                }
            })
        }
    };

    const handleDbRestart = (dbClusterName:string) => {
        const dbCluster = combinedDbClusters.find(item => item.metadata.name===dbClusterName);
        if (dbCluster) {
            restartDbCluster({k8sClusterId, dbCluster}, {
                onSuccess: (updatedObject) => {
                    queryClient.setQueryData(
                        [DB_CLUSTERS_QUERY_KEY, k8sClusterId],
                        (oldData?: ExtraDbCluster[]) => oldData.map(value => value.dbCluster.metadata.name === updatedObject.metadata.name ? {
                            dbCluster: updatedObject,
                            k8sClusterName: value.k8sClusterName,
                        }: value)
                    )
                }
            })
        }
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
              key={1}
              onClick={() => handleDeleteDbCluster(row.original.databaseName!)}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <DeleteOutline/> {Messages.menuItems.delete}
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
                  handleDbSuspendOrResumed(row.original.status, row.original.databaseName);
                  closeMenu();
              }}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <PauseCircleOutline /> {isPaused(row.original.status)? Messages.menuItems.resume: Messages.menuItems.suspend}
            </MenuItem>,
          ]}
          renderDetailPanel={({ row }) => <ExpandedRow row={row} />}
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => {
              navigate(`/databases/${row.original.databaseName}/backups`);
            },
            sx: {
              cursor: 'pointer', // you might want to change the cursor too when adding an onClick
            },
          })}
          renderTopToolbarCustomActions={() => customHeader}
          hideExpandAllIcon
        />
      </Box>
    </Stack>
  );
};
