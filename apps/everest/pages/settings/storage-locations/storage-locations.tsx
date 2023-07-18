import { Add, AutoAwesome, Delete, Edit } from '@mui/icons-material';
import { Box, Button, MenuItem } from '@mui/material';
import { Table } from '@percona/ui-lib.table';
import { type MRT_Cell, type MRT_ColumnDef } from 'material-react-table';
import React, { useCallback, useMemo, useState } from 'react';
import { LabelValue } from '../../../components/db-cluster-view/expandedRow/LabelValue';

interface StorageLocation {
  name: string;
  type: string;
  bucketName: string;
  description?: string;
  endpoint: string;
  accessKey: string;
  secretKey: string;
}

export const StorageLocations = () => {
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  console.log(validationErrors);
  const data = [
    {
      name: 'S3',
      type: 'Amazon S3',
      bucketName: 'dev-backups-storage',
      description: 'Description',
      endpoint: 'endpoint',
      accessKey: 'access key',
      secretKey: 'secret key',
    },
  ];

  const getCommonEditTextFieldProps = useCallback(
    (
      cell: MRT_Cell<StorageLocation>
    ): MRT_ColumnDef<StorageLocation>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        variant: 'outlined',
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onChange: (event) => {
          const isValid = validateRequired(event.target.value);
          console.log(event.target.value, isValid);
          if (!isValid) {
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const validateRequired = (value: string) => !!value.length;

  const columns = useMemo<MRT_ColumnDef<StorageLocation>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          required: true,
        }),
      },
      {
        accessorKey: 'type',
        header: 'Type',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          required: true,
        }),
      },
      {
        accessorKey: 'bucketName',
        header: 'Bucket Name',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'description',
        header: 'Description',
        enableHiding: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          required: false,
        }),
      },
      {
        accessorKey: 'endpoint',
        header: 'Endpoint',
        enableHiding: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          required: true,
        }),
      },
      {
        accessorKey: 'accessKey',
        header: 'Access Key',
        enableHiding: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          required: true,
        }),
      },
      {
        accessorKey: 'secretKey',
        header: 'Secret Key',
        enableHiding: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          required: true,
        }),
      },
    ],
    []
  );
  return (
    <Table
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
          onClick={() => {
            table.setEditingRow(row);
          }}
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
        <Button size="small" startIcon={<Add />} variant="outlined">
          Add storage location
        </Button>
      )}
    />
  );
};
