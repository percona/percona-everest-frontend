import { useMemo } from 'react';
import { Table } from '@percona/ui-lib';
import { MRT_ColumnDef } from 'material-react-table';
import { Messages } from './namespaces.messages';
import { NamespaceInstance } from '../../../shared-types/namespaces.types';

export const Namespaces = () => {
  const namespacesData = [
    {
      name: 'default',
      operator: 'PSMDB (v8.2); PXC (v17.3)',
      name1: 'default',
    },
    {
      name: 'name1',
      operator: 'PG (v8.2); PXC (v17.3)',
      name1: 'default',
    },
  ];

  const columns = useMemo<MRT_ColumnDef<NamespaceInstance>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Namespace',
      },
      {
        accessorKey: 'operator',
        header: 'Operator',
      },
    ],
    []
  );

  return (
    <>
      <Table
        noDataMessage={Messages.noDataMessage}
        hideExpandAllIcon
        // state={{
        //     isLoading: isFetching,
        // }}
        columns={columns}
        data={namespacesData}
        enableRowActions
        // renderRowActionMenuItems={({ row, closeMenu }) => [
        //     <MenuItem
        //         key={1} //TODO EVEREST-677 actions will be in later iterations (now we haven't mockups)
        //         onClick={() => {
        //             // handleDe(row.original.name);
        //             closeMenu();
        //         }}
        //         sx={{ m: 0, display: 'flex', gap: 1, px: 2, py: '10px' }}
        //     >
        //         <Delete />
        //         {Messages.delete}
        //     </MenuItem>,
        // ]}
      />
    </>
  );
};
