import { Add, Delete, Edit } from '@mui/icons-material';
import { Box, Button, MenuItem } from '@mui/material';
import { Table } from '@percona/ui-lib.table';
import { type MRT_ColumnDef } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { LabelValue } from '../../../components/db-cluster-view/expandedRow/LabelValue';
import {
  useBackupStorages,
  useCreateBackupStorage,
  useDeleteBackupStorage,
  useEditBackupStorage,
} from '../../../hooks/backup-storages/useBackupStorages';
import { BackupStorage } from '../../../types/backupStorages.types';
import { CreateEditModalStorage } from './createEditModal/createEditModalStorage';

export const StorageLocations = () => {
  const queryClient = useQueryClient();

  const { data = [], isFetching } = useBackupStorages();
  const { mutate: createBackupStorage } = useCreateBackupStorage();
  const { mutate: editBackupStorage } = useEditBackupStorage();
  const { mutate: deleteBackupStorage } = useDeleteBackupStorage();

  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
  const [selectedStorageLocation, setSelectedStorageLocation] =
    useState<BackupStorage>();

  console.log(data);
  const columns = useMemo<MRT_ColumnDef<BackupStorage>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'type',
        header: 'Type',
      },
      {
        accessorKey: 'bucketName',
        header: 'Bucket Name',
      },
      {
        accessorKey: 'description',
        header: 'Description',
        enableHiding: false,
      },
      {
        accessorKey: 'url',
        header: 'Endpoint',
        enableHiding: false,
      },
    ],
    []
  );
  const handleOpenCreateModal = () => {
    setSelectedStorageLocation(undefined);
    setOpenCreateEditModal(true);
  };

  const handleOpenEditModal = (selectedStorageLocation: BackupStorage) => {
    setSelectedStorageLocation(selectedStorageLocation);
    setOpenCreateEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStorageLocation(undefined);
    setOpenCreateEditModal(false);
  };

  const handleSubmit = (isEdit: boolean, data: BackupStorage) => {
    if (isEdit) {
      editBackupStorage(data, {
        onSuccess: (updatedBackupStorage: BackupStorage) => {
          queryClient.setQueryData(
            ['backupStorages'],
            (oldData?: BackupStorage[]) => {
              return (oldData || []).map((value) =>
                value.id === updatedBackupStorage.id
                  ? updatedBackupStorage
                  : value
              );
            }
          );
        },
      });
    } else {
      createBackupStorage(data, {
        onSuccess: (createdBackupStorage: BackupStorage) => {
          queryClient.setQueryData(
            ['backupStorages'],
            (oldData?: BackupStorage[]) => {
              return [createdBackupStorage, ...(oldData || [])];
            }
          );
        },
      });
    }
    handleCloseModal();
  };

  const handleDeleteBackup = (backupStorageId: string) => {
    deleteBackupStorage(backupStorageId, {
      onSuccess: (_, variables) => {
        console.log(variables);
        queryClient.setQueryData(
          ['backupStorages'],
          (oldData?: BackupStorage[]) => {
            return (oldData || []).filter((value) => value.id !== variables);
          }
        );
      },
    });
  };
  return (
    <>
      <Table
        noDataMessage="No storage locations set"
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
        enableRowActions
        renderRowActionMenuItems={({ table, row }) => [
          <MenuItem
            key={0}
            onClick={() => handleOpenEditModal(row.original)}
            sx={{ m: 0, display: 'flex', gap: 1 }}
          >
            <Edit /> Edit
          </MenuItem>,
          <MenuItem
            key={1}
            onClick={() => handleDeleteBackup(row.original.id!)}
            sx={{ m: 0, display: 'flex', gap: 1 }}
          >
            <Delete />
            Delete
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
        onEditingRowSave={() => {}}
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
                <LabelValue label="Endpoit" value={row.original.url} />
              )}
              {row.original.description && (
                <LabelValue
                  label="Description"
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
        renderTopToolbarCustomActions={() => (
          <Button
            size="small"
            startIcon={<Add />}
            variant="outlined"
            onClick={() => handleOpenCreateModal()}
          >
            Add storage location
          </Button>
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
