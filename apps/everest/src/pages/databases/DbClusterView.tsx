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

import {
  BorderColor,
  DeleteOutline,
  PauseCircleOutline,
} from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Box, Button, MenuItem, Stack } from '@mui/material';
import { Table } from '@percona/ui-lib';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';
import { StatusField } from 'components/status-field/status-field';
import { useDbActions } from 'hooks/api/db-cluster/useDbActions';
import { useDeleteDbCluster } from 'hooks/api/db-cluster/useDeleteDbCluster';
import { DbClusterTableElement } from 'hooks/api/db-clusters/dbCluster.type';
import { useDbClusters } from 'hooks/api/db-clusters/useDbClusters';
import { type MRT_ColumnDef } from 'material-react-table';
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DbClusterStatus } from 'shared-types/dbCluster.types';
import { DbEngineType } from 'shared-types/dbEngines.types';
import { useMainStore } from 'stores/useMainStore';
import { DB_CLUSTER_STATUS_TO_BASE_STATUS } from './DbClusterView.constants';
import {
  beautifyDbClusterStatus,
  convertDbClusterPayloadToTableFormat,
} from './DbClusterView.utils';
import { Messages } from './dbClusterView.messages';
import { DbTypeIconProvider } from './dbTypeIconProvider/DbTypeIconProvider';
import { ExpandedRow } from './expandedRow/ExpandedRow';
import { RestoreDbModal } from 'modals';

export const DbClusterView = () => {
  const [openRestoreDbModal, setOpenRestoreDbModal] = useState(false);
  const [isNewClusterMode, setIsNewClusterMode] = useState(false);
  const setDbClusterName = useMainStore((state) => state.setDbClusterName);
  const { data: dbClusters = [], isLoading: dbClustersLoading } =
    useDbClusters();
  const tableData = useMemo(
    () => convertDbClusterPayloadToTableFormat(dbClusters),
    [dbClusters]
  );

  const { isLoading: deletingCluster } = useDeleteDbCluster();
  const {
    selectedDbCluster,
    openDeleteDialog,
    handleConfirmDelete,
    handleDbRestart,
    handleDbSuspendOrResumed,
    handleDeleteDbCluster,
    handleCloseDeleteDialog,
    isPaused,
  } = useDbActions();
  const navigate = useNavigate();

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
          state={{ isLoading: dbClustersLoading }}
          columns={columns}
          data={tableData}
          enableRowActions
          renderRowActionMenuItems={({ row, closeMenu }) => [
            // TODO: finish when design is ready
            <MenuItem
              key={0}
              component={Link}
              to="/databases/edit"
              state={{ selectedDbCluster: row.original.databaseName! }}
              sx={{
                m: 0,
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                px: 2,
                py: '10px',
              }}
            >
              <BorderColor fontSize="small" /> {Messages.menuItems.edit}
            </MenuItem>,
            <MenuItem
              key={1}
              onClick={() => {
                handleDbRestart(row.original.databaseName);
                closeMenu();
              }}
              sx={{
                m: 0,
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                px: 2,
                py: '10px',
              }}
            >
              <RestartAltIcon /> {Messages.menuItems.restart}
            </MenuItem>,
            <MenuItem
              key={2}
              onClick={() => {
                setDbClusterName(row.original.databaseName);
                setIsNewClusterMode(true);
                setOpenRestoreDbModal(true);
                closeMenu();
              }}
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                px: 2,
                py: '10px',
              }}
            >
              <AddIcon /> {Messages.menuItems.createNewDbFromBackup}
            </MenuItem>,
            <MenuItem
              key={3}
              data-testid={`${row.original?.databaseName}-restore`}
              onClick={() => {
                setDbClusterName(row.original.databaseName);
                setIsNewClusterMode(false);
                setOpenRestoreDbModal(true);
                closeMenu();
              }}
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                px: 2,
                py: '10px',
              }}
            >
              <KeyboardReturnIcon /> {Messages.menuItems.restoreFromBackup}
            </MenuItem>,
            <MenuItem
              key={4}
              disabled={row.original.status === DbClusterStatus.pausing}
              onClick={() => {
                handleDbSuspendOrResumed(row.original.databaseName);
                closeMenu();
              }}
              sx={{
                m: 0,
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                px: 2,
                py: '10px',
              }}
            >
              <PauseCircleOutline />{' '}
              {isPaused(row.original.databaseName)
                ? Messages.menuItems.resume
                : Messages.menuItems.suspend}
            </MenuItem>,
            <MenuItem
              data-testid={`${row.original?.databaseName}-delete`}
              key={5}
              onClick={() => {
                handleDeleteDbCluster(row.original.databaseName!);
                closeMenu();
              }}
              sx={{
                m: 0,
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                px: 2,
                py: '10px',
              }}
            >
              <DeleteOutline /> {Messages.menuItems.delete}
            </MenuItem>,
          ]}
          renderDetailPanel={({ row }) => <ExpandedRow row={row} />}
          muiTableBodyRowProps={({ row, isDetailPanel }) => ({
            onClick: () => {
              if (!isDetailPanel) {
                navigate(`/databases/${row.original.databaseName}/overview`);
              }
            },
            sx: {
              ...(!isDetailPanel && {
                cursor: 'pointer', // you might want to change the cursor too when adding an onClick
              }),
            },
          })}
          renderTopToolbarCustomActions={() => (
            <Button
              size="small"
              startIcon={<AddIcon />}
              component={Link}
              to="/databases/new"
              variant="contained"
              data-testid="add-db-cluster-button"
            >
              {Messages.createDatabase}
            </Button>
          )}
          hideExpandAllIcon
        />
      </Box>
      {openRestoreDbModal && (
        <RestoreDbModal
          isNewClusterMode={isNewClusterMode}
          isOpen={openRestoreDbModal}
          closeModal={() => setOpenRestoreDbModal(false)}
        />
      )}
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
