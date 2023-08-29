import { Delete } from '@mui/icons-material';
import { MenuItem } from '@mui/material';
import { MenuButton } from '@percona/ui-lib.menu-button';
import { Table } from '@percona/ui-lib.table';
import { format } from 'date-fns';
import { MRT_ColumnDef } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { DeleteDialog } from '../../../components/delete-dialog/delete-dialog';
import { StatusField } from '../../../components/status-field/status-field';
import { DATE_FORMAT } from '../../../constants';
import {
  BACKUPS_QUERY_KEY,
  useDbBackups,
  useDeleteBackupStorage,
} from '../../../hooks/api/backups/useBackups';
import { Backup, BackupStatus } from '../../../types/backups.types';
import { BACKUP_STATUS_TO_BASE_STATUS } from './backups-list.constants';
import { Messages } from './backups-list.messages';

export const BackupsList = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState('');
  const queryClient = useQueryClient();
  const { dbClusterName } = useParams();

  const { data: backups = [] } = useDbBackups(dbClusterName!, {
    enabled: !!dbClusterName,
    refetchInterval: 10 * 1000,
  });
  const { mutate: deleteBackup } = useDeleteBackupStorage();

  const columns = useMemo<MRT_ColumnDef<Backup>[]>(
    () => [
      {
        accessorKey: 'state',
        header: 'Status',
        filterVariant: 'multi-select',
        filterSelectOptions: Object.values(BackupStatus),
        Cell: ({ cell }) => (
          <StatusField
            status={cell.getValue<BackupStatus>()}
            statusMap={BACKUP_STATUS_TO_BASE_STATUS}
          >
            {cell.getValue()}
          </StatusField>
        ),
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'created',
        header: 'Started',
        enableColumnFilter: false,
        sortingFn: 'datetime',
        Cell: ({ cell }) =>
          cell.getValue<Date>()
            ? format(cell.getValue<Date>(), DATE_FORMAT)
            : '',
      },
      {
        accessorKey: 'completed',
        header: 'Finished',
        enableColumnFilter: false,
        sortingFn: 'datetime',
        Cell: ({ cell }) =>
          cell.getValue<Date>()
            ? format(cell.getValue<Date>(), DATE_FORMAT)
            : '',
      },
    ],
    []
  );

  const handleDeleteBackup = (backupName: string) => {
    setSelectedBackup(backupName);
    setOpenDeleteDialog(true);
  };

  const handleManualBackup = (handleClose: () => void) => {
    handleClose();
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = (backupName: string) => {
    deleteBackup(backupName, {
      onSuccess() {
        queryClient.invalidateQueries([BACKUPS_QUERY_KEY, dbClusterName]);
      },
    });
  };

  return (
    <>
      <Table
        noDataMessage={Messages.noData}
        data={backups}
        columns={columns}
        renderTopToolbarCustomActions={() => (
          <MenuButton buttonText={Messages.createBackup}>
            {/* MUI Menu does not like fragments and asks for arrays instead */}
            {(handleClose) => [
              <MenuItem
                key="now"
                onClick={() => handleManualBackup(handleClose)}
              >
                {Messages.now}
              </MenuItem>,
              <MenuItem key="schedule">{Messages.schedule}</MenuItem>,
            ]}
          </MenuButton>
        )}
        enableRowActions
        renderRowActionMenuItems={({ row, closeMenu }) => [
          <MenuItem
            key={1}
            onClick={() => {
              handleDeleteBackup(row.original.name);
              closeMenu();
            }}
            sx={{ m: 0, display: 'flex', gap: 1 }}
          >
            <Delete />
            {Messages.delete}
          </MenuItem>,
        ]}
      />
      {openDeleteDialog && (
        <DeleteDialog
          isOpen={openDeleteDialog}
          selectedId={selectedBackup}
          closeModal={handleCloseDeleteDialog}
          headerMessage={Messages.deleteDialog.header}
          handleConfirm={handleConfirmDelete}
        >
          {Messages.deleteDialog.content}
        </DeleteDialog>
      )}
    </>
  );
};
