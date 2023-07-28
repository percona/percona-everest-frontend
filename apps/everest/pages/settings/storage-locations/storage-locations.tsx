import { Add, AutoAwesome, Delete, Edit } from '@mui/icons-material';
import { Box, Button, MenuItem } from '@mui/material';
import { Table } from '@percona/ui-lib.table';
import { type MRT_ColumnDef } from 'material-react-table';
import React, { useMemo, useState } from 'react';
import { LabelValue } from '../../../components/db-cluster-view/expandedRow/LabelValue';
import { CreateEditModalStorage } from './createEditModal/createEditModalStorage';
import {
  StorageLocationType,
  StorageLocationTypes,
} from './storage-locations.types';

export const StorageLocations = () => {
  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
  const [selectedStorageLocation, setSelectedStorageLocation] =
    useState<StorageLocationType>();
  const data = [
    {
      name: 'S3',
      type: StorageLocationTypes.s3,
      bucketName: 'dev-backups-storage',
      description: 'Description',
      endpoint: 'endpoint',
      accessKey: 'access key',
      secretKey: 'secret key',
    },
  ];

  const columns = useMemo<MRT_ColumnDef<StorageLocationType>[]>(
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
        accessorKey: 'endpoint',
        header: 'Endpoint',
        enableHiding: false,
      },
      {
        accessorKey: 'accessKey',
        header: 'Access Key',
        enableHiding: false,
      },
      {
        accessorKey: 'secretKey',
        header: 'Secret Key',
        enableHiding: false,
      },
    ],
    []
  );
  const handleOpenCreateModal = () => {
    setSelectedStorageLocation(undefined);
    setOpenCreateEditModal(true);
  };

  const handleOpenEditModal = (
    selectedStorageLocation: StorageLocationType
  ) => {
    setSelectedStorageLocation(selectedStorageLocation);
    setOpenCreateEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedStorageLocation(undefined);
    setOpenCreateEditModal(false);
  };

  const handleSubmit = (isEdit: boolean, data: StorageLocationType) => {
    console.log(data);
    if (isEdit) {
      console.log('edit submit');
      return;
    }
    console.log('create submit');
  };
  return (
    <>
      <Table
        noDataMessage="No storage locations set"
        state={{
          columnVisibility: {
            description: false,
            endpoint: false,
            accessKey: false,
            secretKey: false,
          },
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
              <LabelValue label="Endpoit" value={row.original.endpoint} />
              {row.original.description && (
                <LabelValue
                  label="Description"
                  value={row.original.description}
                />
              )}
            </Box>
            <Box>
              <LabelValue label="Access key" value={row.original.accessKey} />
              <LabelValue label="Secret key" value={row.original.secretKey} />
            </Box>
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
