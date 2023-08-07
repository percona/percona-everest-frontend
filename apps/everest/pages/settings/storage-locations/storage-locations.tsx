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
} from '../../../hooks/api/backup-storages/useBackupStorages';
import {
  BackupStorage,
  StorageType,
} from '../../../types/backupStorages.types';
import {
  updateDataAfterCreate,
  updateDataAfterDelete,
  updateDataAfterEdit,
} from '../../../utils/generalOptimisticDataUpdate';
import { CreateEditModalStorage } from './createEditModal/create-edit-modal';
import { Messages } from './storage-locations.messages';
import { StorageLocationsFields } from './storage-locations.types';
import { convertStoragesType } from './storage-locations.utils';

export const StorageLocations = () => {
  const queryClient = useQueryClient();

  const { data: backupStorages = [], isFetching } = useBackupStorages();
  const { mutate: createBackupStorage } = useCreateBackupStorage();
  const { mutate: editBackupStorage } = useEditBackupStorage();
  const { mutate: deleteBackupStorage } = useDeleteBackupStorage();

  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
  const [selectedStorageLocation, setSelectedStorageLocation] =
    useState<BackupStorage>();

  const columns = useMemo<MRT_ColumnDef<BackupStorage>[]>(
    () => [
      {
        accessorKey: StorageLocationsFields.name,
        header: Messages.name,
      },
      {
        accessorKey: StorageLocationsFields.type,
        header: Messages.type,
        Cell: ({ cell }) => convertStoragesType(cell.getValue<StorageType>()),
      },
      {
        accessorKey: StorageLocationsFields.bucketName,
        header: Messages.bucketName,
      },
      {
        accessorKey: StorageLocationsFields.description,
        header: Messages.description,
        enableHiding: false,
      },
      {
        accessorKey: StorageLocationsFields.url,
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

  const handleOpenEditModal = (storageLocation: BackupStorage) => {
    setSelectedStorageLocation(storageLocation);
    setOpenCreateEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStorageLocation(undefined);
    setOpenCreateEditModal(false);
  };

  const handleEditBackup = (data: BackupStorage) => {
    editBackupStorage(data, {
      onSuccess: updateDataAfterEdit(queryClient, BACKUP_STORAGES_QUERY_KEY),
    });
  };

  const handleCreateBackup = (data: BackupStorage) => {
    createBackupStorage(data, {
      onSuccess: updateDataAfterCreate(queryClient, BACKUP_STORAGES_QUERY_KEY),
    });
  };

  const handleSubmit = (isEdit: boolean, data: BackupStorage) => {
    if (isEdit) {
      handleEditBackup(data);
    } else {
      handleCreateBackup(data);
    }
    handleCloseModal();
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
        hideExpandAllIcon
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
        data={backupStorages}
        renderTopToolbarCustomActions={() => (
          <Button
            size="small"
            startIcon={<Add />}
            variant="outlined"
            onClick={handleOpenCreateModal}
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
              <LabelValue label={Messages.url} value={row.original.url} />
              <LabelValue
                label={Messages.description}
                value={row.original.description}
              />
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
