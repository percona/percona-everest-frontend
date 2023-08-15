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
import { Link } from "react-router-dom";
import { useQueryClient } from 'react-query';
import { DbClusterTableElement } from '../../hooks/api/db-clusters/dbCluster.type';
import { DB_CLUSTERS_QUERY_KEY, ExtraDbCluster, useDbClusters } from '../../hooks/api/db-clusters/useDbClusters';
import { Messages } from './dbClusterView.messages';
import { DbClusterViewProps } from './dbClusterView.type';
import { DbTypeIconProvider } from './dbTypeIconProvider/DbTypeIconProvider';
import { ExpandedRow } from './expandedRow/ExpandedRow';
import { StatusProvider } from './statusProvider/StatusProvider';
import { DbClusterStatus } from '../../types/dbCluster.types';
import { beautifyDbClusterStatus } from './DbClusterView.utils';
import { DbEngineType } from '../../types/dbEngines.types';
import { useDeleteDbCluster } from '../../hooks/api/db-cluster/useDeleteDbCluster';
import { useSelectedKubernetesCluster } from '../../hooks/api/kubernetesClusters/useSelectedKubernetesCluster';
import { usePausedDbCluster } from '../../hooks/api/db-cluster/usePausedDbCluster';
import { useRestartDbCluster } from '../../hooks/api/db-cluster/useRestartDbCluster';



export const DbClusterView = ({ customHeader }: DbClusterViewProps) => {
  const { combinedDataForTable, loadingAllClusters, combinedDbClusters } = useDbClusters();
  const { mutate: deleteDbCluster } = useDeleteDbCluster();
  const { mutate: suspendDbCluster } = usePausedDbCluster();
  const { mutate: restartDbCluster } = useRestartDbCluster();
  const { id: k8sClusterId } = useSelectedKubernetesCluster();
  const queryClient = useQueryClient();
  const isPaused = (status: DbClusterStatus) => status === DbClusterStatus.paused || status === DbClusterStatus.pausing;

  const handleDeleteDbCluster = (dbClusterName: string) => {
      deleteDbCluster({ k8sClusterId, dbClusterName}, {
          onSuccess: (_, variables) => {
              queryClient.setQueryData(
                  [DB_CLUSTERS_QUERY_KEY, k8sClusterId],
                  (oldData?: ExtraDbCluster[]) => (oldData || []).filter((value) => value.dbCluster.metadata.name !== variables.objectId)
              );
          },
      })
  };
    const handleDbSuspendOrResumed = (status: DbClusterStatus, dbClusterName:string) => {
        const paused = !isPaused(status);
        const dbCluster = combinedDbClusters.find(item => item.metadata.name===dbClusterName);
        if (dbCluster) {
            suspendDbCluster({paused, k8sClusterId, dbCluster}, {
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
        filterSelectOptions: Object.values(DbClusterStatus).map((status) => ({ text: beautifyDbClusterStatus(status), value: status })),
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
        Cell: ({ cell }) => cell.getValue() === 'true' ? 'Enabled' : 'Disabled',
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
          renderRowActionMenuItems={({ row }) => [
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
              <DeleteOutline /> {Messages.menuItems.delete}
            </MenuItem>,
            <MenuItem
              key={2}
              onClick={() => handleDbRestart(row.original.databaseName)}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <RestartAlt /> {Messages.menuItems.restart}
            </MenuItem>,
            <MenuItem
              key={3}
              disabled={row.original.status === DbClusterStatus.pausing}
              onClick={() => handleDbSuspendOrResumed(row.original.status, row.original.databaseName)}
              sx={{ m: 0, display: 'flex', gap: 1, alignItems: 'center' }}
            >
              <PauseCircleOutline /> {isPaused(row.original.status)? Messages.menuItems.resume: Messages.menuItems.suspend}
            </MenuItem>,
          ]}
          renderDetailPanel={({ row }) => <ExpandedRow row={row} />}
          renderTopToolbarCustomActions={() => customHeader}
          hideExpandAllIcon
        />
      </Box>
    </Stack>
  );
};
