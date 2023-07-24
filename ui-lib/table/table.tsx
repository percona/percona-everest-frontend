import { Alert } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import React from 'react';
import { TableProps } from './table.types';

export function Table<T extends Record<string, any>>(props: TableProps<T>) {
  const {
    data,
    columns,
    muiTablePaperProps,
    muiTopToolbarProps,
    displayColumnDefOptions,
    noDataMessage,
  } = props;
  return (
    <MaterialReactTable
      {...props}
      renderEmptyRowsFallback={() => (
        <Alert
          severity="info"
          sx={{
            width: '100%',
            height: '50px',
            marginTop: 1,
            marginBottom: 1,
          }}
        >
          {noDataMessage}
        </Alert>
      )}
      layoutMode="grid"
      columns={columns}
      data={data}
      enablePagination={data.length > 10}
      enableBottomToolbar={data.length > 10}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      enableSorting={!!data.length}
      enableColumnActions={!!data.length}
      enableGlobalFilter={!!data.length}
      enableFilters={!!data.length}
      enableHiding={!!data.length}
      positionActionsColumn="last"
      positionExpandColumn="last"
      muiTablePaperProps={{ elevation: 0, ...muiTablePaperProps }}
      muiTopToolbarProps={{
        sx: {
          '& .MuiBox-root': {
            flexDirection: 'row-reverse',
          },
        },
        ...muiTopToolbarProps,
      }}
      displayColumnDefOptions={{
        'mrt-row-actions': {
          size: 30,
          header: '',
          muiTableBodyCellProps: { sx: { flex: 'none', width: '60px' } },
          muiTableHeadCellProps: { sx: { flex: 'none', width: '60px' } },
        },
        'mrt-row-expand': {
          size: 40,
          muiTableBodyCellProps: {
            sx: {
              flex: 'none',
              width: '60px',
              display: data.length ? 'block' : 'none',
            },
          },
          muiTableHeadCellProps: {
            sx: {
              flex: 'none',
              width: '60px',
              display: data.length ? 'block' : 'none',
            },
          },
        },
        ...displayColumnDefOptions,
      }}
    />
  );
}
