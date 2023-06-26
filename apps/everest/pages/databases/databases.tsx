import AddIcon from '@mui/icons-material/Add';
import { Box, Button, MenuItem, Stack, Typography } from '@mui/material';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_TableInstance,
} from 'material-react-table';
import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

interface DbCluster {
  status: string;
  databaseName: string;
  technology: string;
  backups: string;
  kubernetesCluster: string;
}

export const DatabasesPage = () => {
  const tableInstanceRef = useRef<MRT_TableInstance<DbCluster>>(null);

  const data: DbCluster[] = [
    {
      status: 'Up',
      databaseName: 'Data value',
      technology: 'Mongo 6.0',
      backups: 'enabled',
      kubernetesCluster: 'minicube',
    },
    {
      status: 'Down',
      databaseName: 'Data value 2',
      technology: 'Mongo 7.0',
      backups: 'disabled',
      kubernetesCluster: 'minicube',
    },
  ];

  const columns = useMemo<MRT_ColumnDef<DbCluster>[]>(
    () => [
      {
        accessorKey: 'status', //simple recommended way to define a column
        header: 'Status',
      },
      {
        accessorKey: 'databaseName',
        header: 'Database name',
      },
      { accessorKey: 'technology', header: 'Technology' },
      { accessorKey: 'backups', header: 'Backups' },
      { accessorKey: 'kubernetesCluster', header: 'Kubernetes Cluster' },
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
              maxSize: 50,
            },
            'mrt-row-expand': {
              maxSize: 50,
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
          // renderRowActions={({ row, cell }) => (
          //   <Box>
          //     {tableInstanceRef.current && (
          //       <>
          //         <MRT_ExpandButton
          //           table={tableInstanceRef.current}
          //           row={row}
          //         />
          //       </>
          //     )}
          //   </Box>
          // )}
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
