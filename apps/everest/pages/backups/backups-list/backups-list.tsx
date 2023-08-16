import React, { useMemo } from 'react';
import { Table } from '@percona/ui-lib.table';
import { MenuItem } from '@mui/material';
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

  const handleManualBackup = (handleClose: () => void) => {
    handleClose();
  }

  return (
    <Table
      noDataMessage="You don't have any backups yet. Create one to get started"
      data={[]}
      columns={columns}
      renderTopToolbarCustomActions={() => (
        <MenuButton buttonText='Create Backup'>
          {/* MUI Menu does not like fragments and asks for arrays instead */}
          {(handleClose) => [
              <MenuItem key="now" onClick={() => handleManualBackup(handleClose)}>Now</MenuItem>,
              <MenuItem key="schedule">Schedule</MenuItem>
            ]
          }
        </MenuButton>
      )}
    />
  );
};
