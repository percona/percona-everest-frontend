import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, MenuItem } from '@mui/material';
import { Table } from '@percona/ui-lib.table';
import { type MRT_ColumnDef } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { LabelValue } from '../../../components/db-cluster-view/expandedRow/LabelValue';
import {
  BACKUP_STORAGES_QUERY_KEY,
  useBackupStorages,
  useCreateBackupStorage,
  useDeleteBackupStorage,
  useEditBackupStorage,
} from '../../../hooks/backup-storages/useBackupStorages';
import { CreateEditModalStorage } from './createEditModal/create-edit-modal';
import { Messages } from './storage-locations.messages';
import { BackupStorageType } from './storage-locations.types';
import {
  updateDataAfterCreate,
  updateDataAfterDelete,
  updateDataAfterEdit,
} from './storage-locations.utils';

export const StorageLocations = () => {
  const queryClient = useQueryClient();

  const { data = [], isFetching } = useBackupStorages();
  const { mutate: createBackupStorage } = useCreateBackupStorage();
  const { mutate: editBackupStorage } = useEditBackupStorage();
  const { mutate: deleteBackupStorage } = useDeleteBackupStorage();

  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
  const [selectedStorageLocation, setSelectedStorageLocation] =
    useState<BackupStorageType>();

  const columns = useMemo<MRT_ColumnDef<BackupStorageType>[]>(
    () => [
      {
        accessorKey: 'name',
        header: Messages.name,
      },
      {
        accessorKey: 'type',
        header: Messages.type,
      },
      {
        accessorKey: 'bucketName',
        header: Messages.bucketName,
      },
      {
        accessorKey: 'description',
        header: Messages.description,
        enableHiding: false,
      },
      {
        accessorKey: 'url',
        header: Messages.url,
        enableHiding: false,
      },
    ],
    []
  );
  const handleOpenCreateModal = () => {
    setSelectedStorageLocation(undefined);
    setOpenCreateEditModal(true);
  };

  const handleOpenEditModal = (selectedStorageLocation: BackupStorageType) => {
    setSelectedStorageLocation(selectedStorageLocation);
    setOpenCreateEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStorageLocation(undefined);
    setOpenCreateEditModal(false);
  };

  const handleSubmit = (isEdit: boolean, data: BackupStorageType) => {
    isEdit ? handleEditBackup(data) : handleCreateBackup(data);
    handleCloseModal();
  };

  const handleEditBackup = (data: BackupStorageType) => {
    editBackupStorage(data, {
      onSuccess: updateDataAfterEdit(queryClient, BACKUP_STORAGES_QUERY_KEY),
    });
  };

  const handleCreateBackup = (data: BackupStorageType) => {
    createBackupStorage(data, {
      onSuccess: updateDataAfterCreate(queryClient, BACKUP_STORAGES_QUERY_KEY),
    });
  };

  const handleDeleteBackup = (backupStorageId: string) => {
    deleteBackupStorage(backupStorageId, {
      onSuccess: updateDataAfterDelete(queryClient, BACKUP_STORAGES_QUERY_KEY),
    });
  };
  return (
    <>
      <Table
        noDataMessage="No backups storages"
        state={{
          columnVisibility: {
            description: false,
            url: false,
            accessKey: false,
            secretKey: false,
          },
          isLoading: isFetching,
        }}
        columns={columns}
        data={data}
        renderTopToolbarCustomActions={() => (
          <Button
            size="small"
            startIcon={<Add />}
            variant="outlined"
            onClick={() => handleOpenCreateModal()}
          >
            {Messages.addStorageLocationButton}
          </Button>
        )}
        enableRowActions
        renderRowActionMenuItems={({ row }) => [
          <MenuItem
            key={0}
            onClick={() => handleOpenEditModal(row.original)}
            sx={{ m: 0, display: 'flex', gap: 1 }}
          >
            <Edit /> {Messages.edit}
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => handleDeleteBackup(row.original.id!)}
            sx={{ m: 0, display: 'flex', gap: 1 }}
          >
            <Delete />
            {Messages.delete}
          </MenuItem>,
          // TODO: uncomment when api is ready
          // <MenuItem
          //   key={2}
          //   onClick={() => {}}
          //   sx={{ m: 0, display: 'flex', gap: 1 }}
          // >
          //   <AutoAwesome /> Set as default
          // </MenuItem>,
        ]}
        renderDetailPanel={({ row }) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'start',
              gap: '50px',
            }}
          >
            <Box>
              {row.original.url && (
                <LabelValue label={Messages.url} value={row.original.url} />
              )}
              {row.original.description && (
                <LabelValue
                  label={Messages.description}
                  value={row.original.description}
                />
              )}
            </Box>
            {/* TODO: uncomment when endpoint is ready
            <Box>
              <LabelValue label="Access key" value={row.original.accessKey} />
              <LabelValue label="Secret key" value={row.original.secretKey} />
            </Box>  */}
          </Box>
        )}
      />
      {openCreateEditModal && (
        <CreateEditModalStorage
          open={openCreateEditModal}
          handleCloseModal={handleCloseModal}
          handleSubmitModal={handleSubmit}
          selectedStorageLocation={selectedStorageLocation}
        />
      )}
    </>
  );
};
