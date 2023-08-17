import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from '@percona/ui-lib.table';
import { MenuItem } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { MenuButton } from '@percona/ui-lib.menu-button';
import { useDbBackups } from '../../../hooks/api/backups/useBackups';
import { Backup } from '../../../types/backups.types';

export const BackupsList = () => {
  const { dbClusterName } = useParams();

  const { data: backups = [] } = useDbBackups(dbClusterName!, { enabled: !!dbClusterName, refetchInterval: 10 * 1000 });

  const columns = useMemo<MRT_ColumnDef<Backup>[]>(
    () => [
      {
        accessorKey: 'state',
        header: 'Status',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'created',
        header: 'Started',
      },
      {
        accessorKey: 'completed',
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
