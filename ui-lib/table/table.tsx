/* eslint-disable react/prop-types */
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Alert } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import React, { useEffect } from 'react';
import { ICONS_OPACITY } from './table.constants';
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

  const stopPropagation = (e: Event) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const hideColumnsIcon = document.querySelector(
      '[aria-label="Show/Hide columns"]'
    );
    const showFiltesIcon = document.querySelector(
      '[aria-label="Show/Hide filters"]'
    );
    const globalFilterIcon = document.querySelector(
      '[aria-label="Show/Hide search"]'
    );
    const elementsWithExpandLabel = document.querySelectorAll(
      '[aria-label="Column Actions"]'
    );

    if (!data.length) {
      hideColumnsIcon?.addEventListener('click', stopPropagation);
      showFiltesIcon?.addEventListener('click', stopPropagation);
      globalFilterIcon?.addEventListener('click', stopPropagation);
      elementsWithExpandLabel.forEach((element) => {
        element.addEventListener('click', stopPropagation);
      });
    }

    return () => {
      globalFilterIcon?.removeEventListener('click', stopPropagation);
      showFiltesIcon?.removeEventListener('click', stopPropagation);
      hideColumnsIcon?.removeEventListener('click', stopPropagation);
      elementsWithExpandLabel.forEach((element) => {
        element.removeEventListener('click', stopPropagation);
      });
    };
  }, [data]);

  return (
    <MaterialReactTable
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
      enablePagination={data.length > 10}
      enableBottomToolbar={data.length > 10}
      enableDensityToggle={false}
      enableFullScreenToggle={false}
      enableSorting={!!data.length}
      icons={{
        KeyboardDoubleArrowDownIcon: (propsIcon) =>
          data.length ? (
            <KeyboardDoubleArrowDownIcon {...propsIcon} />
          ) : (
            <KeyboardDoubleArrowDownIcon sx={{ opacity: ICONS_OPACITY }} />
          ),
        SearchIcon: () => (
          <SearchIcon sx={{ opacity: !data.length ? ICONS_OPACITY : 1 }} />
        ),
        FilterListIcon: () => (
          <FilterListIcon sx={{ opacity: !data.length ? ICONS_OPACITY : 1 }} />
        ),
        ViewColumnIcon: () => (
          <ViewColumnIcon sx={{ opacity: !data.length ? ICONS_OPACITY : 1 }} />
        ),
        MoreVertIcon: () => (
          <MoreVertIcon sx={{ opacity: !data.length ? ICONS_OPACITY : 1 }} />
        ),
      }}
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
            },
          },
          muiTableHeadCellProps: {
            sx: {
              flex: 'none',
              width: '60px',
            },
          },
        },
        ...displayColumnDefOptions,
      }}
      {...props}
      columns={columns}
      data={data}
    />
  );
}
