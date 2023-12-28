import { useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Table } from '@percona/ui-lib';
import { useMonitoringInstancesList } from 'hooks/api/monitoring/useMonitoringInstancesList';
import { MRT_ColumnDef } from 'material-react-table';
import { MonitoringInstance } from 'shared-types/monitoring.types';
import { CreateEditEndpointModal } from './createEditModal/create-edit-modal';
import { EndpointFormType } from './createEditModal/create-edit-modal.types';

export const MonitoringEndpoints = () => {
  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
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

  const handleOpenCreateModal = () => {
    // setSelectedStorageLocation(undefined);
    setOpenCreateEditModal(true);
  };

  const handleCloseModal = () => setOpenCreateEditModal(false);
  const handleSubmitModal = (data: EndpointFormType) => {
    console.log(data);
  };

  return (
    <>
      <Table
        hideExpandAllIcon
        data={monitoringInstances}
        columns={columns}
        noDataMessage="No monitoring endpoint added"
        renderTopToolbarCustomActions={() => (
          <Button
            size="small"
            startIcon={<Add />}
            variant="outlined"
            onClick={handleOpenCreateModal}
          >
            Add Endpoint
          </Button>
        )}
      />
      {openCreateEditModal && (
        <CreateEditEndpointModal
          open={openCreateEditModal}
          handleClose={handleCloseModal}
          handleSubmit={handleSubmitModal}
        />
      )}
    </>
  );
};
