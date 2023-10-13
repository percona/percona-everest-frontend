import { Box, Button, MenuItem } from '@mui/material';
import { type MRT_ColumnDef } from 'material-react-table';
import React, { useMemo } from 'react';
import { Table } from './table';

interface Person {
  firstName: string;
  lastName: string;
}

export const BasicTable = () => {
  const data: Person[] = [{ firstName: 'Filip', lastName: 'Jones' }];

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
      },
      { accessorKey: 'lastName', header: 'Last Name' },
    ],
    []
  );

  return (
    <Table
      noDataMessage="No data"
      columns={columns}
      data={data}
      enableRowActions
      renderRowActionMenuItems={({ table, row }) => [
        <MenuItem
          key={0}
          onClick={() => {
            table.setEditingRow(row);
          }}
          sx={{ m: 0 }}
        >
          Edit
        </MenuItem>,
        <MenuItem key={1} onClick={() => {}} sx={{ m: 0 }}>
          Delete
        </MenuItem>,
      ]}
      renderDetailPanel={({ row }) => <Box>{row.original.firstName}</Box>}
      renderTopToolbarCustomActions={() => (
        <Button size="small" variant="contained">
          Custom button
        </Button>
      )}
    />
  );
};
