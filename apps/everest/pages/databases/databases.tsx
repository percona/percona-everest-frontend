import AddIcon from '@mui/icons-material/Add';
import { Box, Button, MenuItem, Stack, Typography } from '@mui/material';
import {
  MaterialReactTable,
  MRT_ExpandButton,
  type MRT_ColumnDef,
  type MRT_TableInstance,
} from 'material-react-table';
import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Person {
  name: string;
  age: number;
}

export const DatabasesPage = () => {
  const tableInstanceRef = useRef<MRT_TableInstance<Person>>(null);

  const data: Person[] = [
    {
      name: 'John', // key "name" matches `accessorKey` in ColumnDef down below
      age: 30, // key "age" matches `accessorKey` in ColumnDef down below
    },
    {
      name: 'Sara',
      age: 25,
    },
  ];

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name', //simple recommended way to define a column
        header: 'Name',
        muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
      },
      {
        accessorFn: (originalRow) => originalRow.age, //alternate way
        id: 'age', //id required if you use accessorFn instead of accessorKey
        header: 'Age',
        Header: <i style={{ color: 'red' }}>Age</i>, //optional custom markup
      },
    ],
    []
  );
  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h5">Databases</Typography>

      <Box sx={{ width: '100%' }}>
        <MaterialReactTable
          muiTableProps={{
            sx: {
              tableLayout: 'fixed',
            },
          }}
          // defaultColumn={{
          //   minSize: 10, //allow columns to get smaller than default
          //   maxSize: 9001, //allow columns to get larger than default
          //   size: 100,
          // }}
          tableInstanceRef={tableInstanceRef}
          columns={columns}
          data={data}
          enablePagination={data.length > 10}
          enableBottomToolbar={data.length > 10}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          enableRowActions
          positionActionsColumn="last"
          positionExpandColumn="last"
          // initialState={{
          //   columnVisibility: {
          //     'mrt-row-expand': true,
          //   },
          // }}
          displayColumnDefOptions={{
            'mrt-row-actions': {
              maxSize: 1,
            },
            'mrt-row-expand': {
              maxSize: 1,
            },
          }}
          renderRowActionMenuItems={({ closeMenu, row }) => [
            <MenuItem key={0} onClick={() => {}} sx={{ m: 0 }}>
              Edit
            </MenuItem>,
            <MenuItem key={1} onClick={() => {}} sx={{ m: 0 }}>
              Delete
            </MenuItem>,
          ]}
          renderRowActions={({ row, cell }) => (
            <Box>
              {tableInstanceRef.current && (
                <>
                  <MRT_ExpandButton
                    table={tableInstanceRef.current}
                    row={row}
                  />
                </>
              )}
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              size="small"
              startIcon={<AddIcon />}
              component={Link}
              to="/databases/new"
              variant="outlined"
            >
              Create Database
            </Button>
          )}
          renderDetailPanel={({ row }) => (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              Test
            </Box>
          )}
        />
      </Box>
    </Stack>
  );
};
