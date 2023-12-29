import { useMemo, useState } from 'react';
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useQueryClient } from 'react-query';
import { Table } from '@percona/ui-lib';
import {
  useMonitoringInstancesList,
  useCreateMonitoringInstance,
  MONITORING_INSTANCES_QUERY_KEY,
} from 'hooks/api/monitoring/useMonitoringInstancesList';
import { MRT_ColumnDef } from 'material-react-table';
import { MonitoringInstance } from 'shared-types/monitoring.types';
import { CreateEditEndpointModal } from './createEditModal/create-edit-modal';
import { EndpointFormType } from './createEditModal/create-edit-modal.types';
import { updateDataAfterCreate } from 'utils/generalOptimisticDataUpdate';

export const MonitoringEndpoints = () => {
  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
  const { data: monitoringInstances = [] } = useMonitoringInstancesList();
  const { mutate: createMonitoringInstance, isLoading: creatingInstance } =
    useCreateMonitoringInstance();
  const queryClient = useQueryClient();
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
    setOpenCreateEditModal(true);
  };

  const handleCloseModal = () => setOpenCreateEditModal(false);
  const handleSubmitModal = ({ name, url, ...pmmData }: EndpointFormType) => {
    createMonitoringInstance(
      { name, url, type: 'pmm', pmm: { ...pmmData } },
      {
        onSuccess: (newInstance) => {
          updateDataAfterCreate(
            queryClient,
            MONITORING_INSTANCES_QUERY_KEY
          )(newInstance);
          setOpenCreateEditModal(false);
        },
      }
    );
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
          isLoading={creatingInstance}
        />
      )}
    </>
  );
};
