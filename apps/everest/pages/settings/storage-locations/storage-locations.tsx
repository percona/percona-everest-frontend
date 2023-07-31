import { Add, AutoAwesome, Delete, Edit } from '@mui/icons-material';
import { Box, Button, MenuItem } from '@mui/material';
import { Table } from '@percona/ui-lib.table';
import { type MRT_ColumnDef } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import { LabelValue } from '../../../components/db-cluster-view/expandedRow/LabelValue';
import {
  useBackupStorages,
  useCreateBackupStorage,
} from '../../../hooks/backup-storages/useBackupStorages';
import { BackupStorage } from '../../../types/backupStorages.types';
import { CreateEditModalStorage } from './createEditModal/createEditModalStorage';

export const StorageLocations = () => {
  const { mutate: createBackupStorage } = useCreateBackupStorage();
  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
  const [selectedStorageLocation, setSelectedStorageLocation] =
    useState<BackupStorage>();

  const { data = [], isFetching } = useBackupStorages();

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
      //TODO: uncomment when endpoint is ready
      // {
      //   accessorKey: 'accessKey',
      //   header: 'Access Key',
      //   enableHiding: false,
      // },
      // {
      //   accessorKey: 'secretKey',
      //   header: 'Secret Key',
      //   enableHiding: false,
      // },
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
    console.log(data);
    if (isEdit) {
      console.log('edit submit');
    } else {
      createBackupStorage(data);
    }
    handleCloseModal();
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
            onClick={() => {}}
            sx={{ m: 0, display: 'flex', gap: 1 }}
          >
            <Delete />
            Delete
          </MenuItem>,
          <MenuItem
            key={2}
            onClick={() => {}}
            sx={{ m: 0, display: 'flex', gap: 1 }}
          >
            <AutoAwesome /> Set as default
          </MenuItem>,
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
