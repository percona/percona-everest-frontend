import { Delete } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { MenuItem } from '@mui/material';
import { MenuButton } from '@percona/ui-lib.menu-button';
import { Table } from '@percona/ui-lib.table';
import { format } from 'date-fns';
import { MRT_ColumnDef } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmDialog } from '../../../components/confirm-dialog/confirm-dialog';
import { StatusField } from '../../../components/status-field/status-field';
import { DATE_FORMAT } from '../../../constants';
import {
  BACKUPS_QUERY_KEY,
  useDbBackups,
  useDeleteBackup,
} from '../../../hooks/api/backups/useBackups';
import { useDbClusterRestore } from '../../../hooks/api/restores/useDbClusterRestore';
import { Backup, BackupStatus } from '../../../types/backups.types';
import { OnDemandBackupModal } from '../on-demand-backup-modal/on-demand-backup-modal';
import { BACKUP_STATUS_TO_BASE_STATUS } from './backups-list.constants';
import { Messages } from './backups-list.messages';

export const BackupsList = () => {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);
  const [openRestoreToNewDbDialog, setOpenRestoreToNewDbDialog] =
    useState(false);
  const [selectedBackup, setSelectedBackup] = useState('');
  const [selectedBackupStorage, setSelectedBackupStorage] = useState('');
  const queryClient = useQueryClient();
  const { dbClusterName } = useParams();
  const [openCreateBackupModal, setOpenCreateBackupModal] = useState(false);
  const { data: backups = [] } = useDbBackups(dbClusterName!, {
    enabled: !!dbClusterName,
    refetchInterval: 10 * 1000,
  });
  const { mutate: deleteBackup, isLoading: deletingBackup } = useDeleteBackup();
  const { mutate: restoreBackup, isLoading: restoringBackup } = useDbClusterRestore(dbClusterName!);

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
    setOpenCreateBackupModal(true);
    handleClose();
  };

  const handleCloseBackupModal = () => {
    setOpenCreateBackupModal(false);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = (backupName: string) => {
    deleteBackup(backupName, {
      onSuccess: () => {
        queryClient.invalidateQueries([BACKUPS_QUERY_KEY, dbClusterName]);
        handleCloseDeleteDialog();
      },
    });
  };

  const handleRestoreBackup = (backupName: string) => {
    setSelectedBackup(backupName);
    setOpenRestoreDialog(true);
  };

  const handleCloseRestoreDialog = () => {
    setOpenRestoreDialog(false);
  };

  const handleConfirmRestore = (backupName: string) => {
    restoreBackup(
      { backupName },
      {
        onSuccess() {
          navigate('/databases');
        },
      }
    );
  };

  const handleRestoreToNewDbBackup = (
    backupName: string,
    backupStorageName: string
  ) => {
    setSelectedBackup(backupName);
    setSelectedBackupStorage(backupStorageName);
    setOpenRestoreToNewDbDialog(true);
  };

  const handleCloseRestoreToNewDbDialog = () => {
    setOpenRestoreToNewDbDialog(false);
  };

  const handleConfirmRestoreToNewDb = (backupName: string) => {
    navigate('/databases/new', {
      state: {
        selectedDbCluster: dbClusterName!,
        backupName,
        backupStorageName: selectedBackupStorage,
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
              // TODO: Uncomment when ready
              // <MenuItem key="schedule">{Messages.schedule}</MenuItem>,
            ]}
          </MenuButton>
        )}
        enableRowActions
        renderRowActionMenuItems={({ row, closeMenu }) => [
          <MenuItem
            key={0}
            disabled={row.original.state !== BackupStatus.OK}
            onClick={() => {
              handleRestoreBackup(row.original.name);
              closeMenu();
            }}
            sx={{ m: 0, display: 'flex', gap: 1 }}
          >
            <RestartAltIcon />
            {Messages.restore}
          </MenuItem>,
          <MenuItem
            key={1}
            disabled={row.original.state !== BackupStatus.OK}
            onClick={() => {
              handleRestoreToNewDbBackup(
                row.original.name,
                row.original.backupStorageName
              );
              closeMenu();
            }}
            sx={{ m: 0, display: 'flex', gap: 1 }}
          >
            <AddIcon />
            {Messages.restoreToNewDb}
          </MenuItem>,
          <MenuItem
            key={2}
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
      <OnDemandBackupModal
        open={openCreateBackupModal}
        handleClose={handleCloseBackupModal}
        numberOfBackups={backups.length}
      />
      {openDeleteDialog && (
        <ConfirmDialog
          isOpen={openDeleteDialog}
          selectedId={selectedBackup}
          closeModal={handleCloseDeleteDialog}
          headerMessage={Messages.deleteDialog.header}
          handleConfirm={handleConfirmDelete}
          disabledButtons={deletingBackup}
        >
          {Messages.deleteDialog.content}
        </ConfirmDialog>
      )}
      {openRestoreDialog && (
        <ConfirmDialog
          isOpen={openRestoreDialog}
          selectedId={selectedBackup}
          closeModal={handleCloseRestoreDialog}
          headerMessage={Messages.restoreDialog.header}
          handleConfirm={handleConfirmRestore}
          submitMessage={Messages.restoreDialog.submitButton}
          disabledButtons={restoringBackup}
        >
          {Messages.restoreDialog.content}
        </ConfirmDialog>
      )}
      {openRestoreToNewDbDialog && (
        <ConfirmDialog
          isOpen={openRestoreToNewDbDialog}
          selectedId={selectedBackup}
          closeModal={handleCloseRestoreToNewDbDialog}
          headerMessage={Messages.restoreDialogToNewDb.header}
          handleConfirm={handleConfirmRestoreToNewDb}
          submitMessage={Messages.restoreDialogToNewDb.submitButton}
        >
          {Messages.restoreDialogToNewDb.content}
        </ConfirmDialog>
      )}
    </>
  );
};
