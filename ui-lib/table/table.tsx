import {
  MaterialReactTable,
  type MaterialReactTableProps,
} from 'material-react-table';
import React from 'react';

export function Table<T extends Record<string, any>>(
  props: MaterialReactTableProps<T>
) {
  const {
    data,
    columns,
    muiTablePaperProps,
    muiTopToolbarProps,
    displayColumnDefOptions,
  } = props;
  return (
    <MaterialReactTable
      {...props}
      layoutMode="grid"
      columns={columns}
      data={data}
      enablePagination={data.length > 10}
      enableBottomToolbar={data.length > 10}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
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
          muiTableBodyCellProps: { sx: { flex: 'none', width: '60px' } },
          muiTableHeadCellProps: { sx: { flex: 'none', width: '60px' } },
        },
        ...displayColumnDefOptions,
      }}
    />
  );
}
