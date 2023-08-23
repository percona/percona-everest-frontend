import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from '@percona/ui-lib.table';
import { MenuItem } from '@mui/material';
import { MRT_ColumnDef } from 'material-react-table';
import { MenuButton } from '@percona/ui-lib.menu-button';
import { format } from 'date-fns';
import { useDbBackups } from '../../../hooks/api/backups/useBackups';
import { Backup, BackupStatus } from '../../../types/backups.types';
import { DATE_FORMAT } from '../../../constants';
import { StatusField } from '../../../components/status-field/status-field';
import { BACKUP_STATUS_TO_BASE_STATUS } from './backups-list.constants';
import { Messages } from './backups-list.messages';

export const BackupsList = () => {
  const { dbClusterName } = useParams();

  const { data: backups = [] } = useDbBackups(dbClusterName!, { enabled: !!dbClusterName, refetchInterval: 10 * 1000 });

  const columns = useMemo<MRT_ColumnDef<Backup>[]>(
    () => [
      {
        accessorKey: 'state',
        header: 'Status',
        filterVariant: 'multi-select',
        filterSelectOptions: Object.values(BackupStatus),
        Cell: ({ cell }) => <StatusField status={cell.getValue<BackupStatus>()} statusMap={BACKUP_STATUS_TO_BASE_STATUS}>{cell.getValue()}</StatusField>
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'created',
        header: 'Started',
        enableColumnFilter: false,
        sortingFn: 'datetime',
        Cell: ({ cell }) => cell.getValue<Date>() ? format(cell.getValue<Date>(), DATE_FORMAT) : '',
      },
      {
        accessorKey: 'completed',
        header: 'Finished',
        enableColumnFilter: false,
        sortingFn: 'datetime',
        Cell: ({ cell }) => cell.getValue<Date>() ? format(cell.getValue<Date>(), DATE_FORMAT) : '',
      },
    ],
    []
  );

  const handleManualBackup = (handleClose: () => void) => {
    handleClose();
  }

  return (
    <Table
      noDataMessage={Messages.noData}
      data={backups}
      columns={columns}
      renderTopToolbarCustomActions={() => (
        <MenuButton buttonText={Messages.createBackup}>
          {/* MUI Menu does not like fragments and asks for arrays instead */}
          {(handleClose) => [
              <MenuItem key="now" onClick={() => handleManualBackup(handleClose)}>{Messages.now}</MenuItem>,
              <MenuItem key="schedule">{Messages.schedule}</MenuItem>
            ]
          }
        </MenuButton>
      )}
    />
  );
};
