import { Table } from '@percona/ui-lib';
import { useMonitoringInstancesList } from 'hooks/api/monitoring/useMonitoringInstancesList';
import { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';
import { MonitoringInstance } from 'shared-types/monitoring.types';

export const MonitoringEndpoints = () => {
  const { data: monitoringInstances = [] } = useMonitoringInstancesList();
  const columns = useMemo<MRT_ColumnDef<MonitoringInstance>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'url',
        header: 'Endpoint',
      },
    ],
    []
  );

  return (
    <Table
      hideExpandAllIcon
      data={monitoringInstances}
      columns={columns}
      noDataMessage="No monitoring endpoint added"
    />
  );
};
