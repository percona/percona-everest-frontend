import { jsx as _jsx } from "react/jsx-runtime";
// @ts-nocheck
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Alert } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { useEffect } from 'react';
import { ICONS_OPACITY } from './table.constants';
function Table(props) {
    const { data, columns, muiTablePaperProps, muiTopToolbarProps, displayColumnDefOptions, noDataMessage, hideExpandAllIcon, } = props;
    const stopPropagation = (e) => {
        e.stopPropagation();
    };
    useEffect(() => {
        const hideColumnsIcon = document.querySelector('[aria-label="Show/Hide columns"]');
        const showFiltesIcon = document.querySelector('[aria-label="Show/Hide filters"]');
        const globalFilterIcon = document.querySelector('[aria-label="Show/Hide search"]');
        const elementsWithExpandLabel = document.querySelectorAll('[aria-label="Column Actions"]');
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
    // disable hiding for first 2 columns
    const customColumns = columns.map((col, index) => {
        if (index < 2) {
            return { ...col, enableHiding: false };
        }
        return col;
    });
    return (_jsx(MaterialReactTable, { renderEmptyRowsFallback: () => (_jsx(Alert, { severity: "info", sx: {
                width: '100%',
                height: '50px',
                marginTop: 1,
                marginBottom: 1,
            }, children: noDataMessage })), layoutMode: "grid", enablePagination: data.length > 10, enableBottomToolbar: data.length > 10, enableDensityToggle: false, enableFullScreenToggle: false, enableSorting: !!data.length, autoResetAll: false, icons: {
            KeyboardDoubleArrowDownIcon: (propsIcon) => data.length ? (_jsx(KeyboardDoubleArrowDownIcon, { ...propsIcon })) : (_jsx(KeyboardDoubleArrowDownIcon, { sx: { opacity: ICONS_OPACITY } })),
            SearchIcon: () => (_jsx(SearchIcon, { sx: { opacity: !data.length ? ICONS_OPACITY : 1 } })),
            FilterListIcon: () => (_jsx(FilterListIcon, { sx: { opacity: !data.length ? ICONS_OPACITY : 1 } })),
            ViewColumnIcon: () => (_jsx(ViewColumnIcon, { sx: { opacity: !data.length ? ICONS_OPACITY : 1 } })),
            MoreVertIcon: () => (_jsx(MoreVertIcon, { sx: { opacity: !data.length ? ICONS_OPACITY : 1 } })),
        }, positionActionsColumn: "last", positionExpandColumn: "last", muiTablePaperProps: { elevation: 0, ...muiTablePaperProps }, muiTopToolbarProps: {
            sx: {
                '& .MuiBox-root': {
                    flexDirection: 'row-reverse',
                    ...muiTopToolbarProps?.sx,
                },
            },
            ...muiTopToolbarProps,
        }, displayColumnDefOptions: {
            'mrt-row-actions': {
                size: 30,
                muiTableBodyCellProps: {
                    sx: {
                        flex: 'none',
                        width: '60px',
                        ...displayColumnDefOptions?.['mrt-row-actions']
                            ?.muiTableBodyCellProps?.sx,
                    },
                    ...displayColumnDefOptions?.['mrt-row-actions']
                        ?.muiTableBodyCellProps,
                },
                muiTableHeadCellProps: {
                    sx: {
                        flex: 'none',
                        width: '60px',
                        // We could simply set "mrt-row-actions.header" to ""
                        // However, MRT takes that string and shows it in the show/hide columns menu
                        // By doing this, we still have "Actions" in that menu, but no text (i.e. transparent) in the header cell
                        color: 'transparent',
                        ...displayColumnDefOptions?.['mrt-row-actions']
                            ?.muiTableHeadCellProps?.sx,
                    },
                    ...displayColumnDefOptions?.['mrt-row-actions']
                        ?.muiTableHeadCellProps,
                },
                ...displayColumnDefOptions?.['mrt-row-actions'],
            },
            'mrt-row-expand': {
                size: 40,
                muiTableBodyCellProps: {
                    sx: {
                        flex: 'none',
                        width: '60px',
                        ... // @ts-ignore
                        displayColumnDefOptions?.['mrt-row-expand']?.muiTableBodyCellProps
                            ?.sx,
                    },
                    ...displayColumnDefOptions?.['mrt-row-expand']
                        ?.muiTableBodyCellProps,
                },
                muiTableHeadCellProps: {
                    sx: {
                        flex: 'none',
                        width: '60px',
                        ...(!!hideExpandAllIcon && {
                            '& button': {
                                display: 'none',
                            },
                        }),
                        ...displayColumnDefOptions?.['mrt-row-expand']
                            ?.muiTableHeadCellProps?.sx,
                    },
                    ...displayColumnDefOptions?.['mrt-row-expand']
                        ?.muiTableHeadCellProps,
                },
                ...displayColumnDefOptions?.['mrt-row-expand'],
            },
            ...displayColumnDefOptions,
        }, ...props, columns: customColumns, data: data }));
}
export default Table;
//# sourceMappingURL=table.js.map