import React, { useMemo, useState } from 'react';
import { Table } from '@percona/ui-lib.table';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { MRT_ColumnDef } from 'material-react-table';
import { MenuButton } from '@percona/ui-lib.menu-button';

export const BackupsList = () => {

  const columns = useMemo<MRT_ColumnDef[]>(
    () => [
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'size',
        header: 'Size',
      },
      {
        accessorKey: 'started',
        header: 'Started',
      },
      {
        accessorKey: 'finished',
        header: 'Finished',
      },
    ],
    []
  );

  return (
    <Table
      noDataMessage="You don't have any backups yet. Create one to get started"
      data={[]}
      columns={columns}
      renderTopToolbarCustomActions={() => (
        <MenuButton buttonText='Create Backup'>
          <MenuItem>Now</MenuItem>
          <MenuItem>Schedule</MenuItem>
        </MenuButton>
      )}
    />
  );
};
