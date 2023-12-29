import { useMemo, useState } from 'react';
import { Button, MenuItem } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useQueryClient } from 'react-query';
import { Table } from '@percona/ui-lib';
import {
  useMonitoringInstancesList,
  useCreateMonitoringInstance,
  MONITORING_INSTANCES_QUERY_KEY,
  useDeleteMonitoringInstance,
} from 'hooks/api/monitoring/useMonitoringInstancesList';
import { MRT_ColumnDef } from 'material-react-table';
import { MonitoringInstance } from 'shared-types/monitoring.types';
import { CreateEditEndpointModal } from './createEditModal/create-edit-modal';
import { EndpointFormType } from './createEditModal/create-edit-modal.types';
import {
  updateDataAfterCreate,
  updateDataAfterDelete,
} from 'utils/generalOptimisticDataUpdate';
import { ConfirmDialog } from 'components/confirm-dialog/confirm-dialog';

export const MonitoringEndpoints = () => {
  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedInstance, setSelectedInstance] =
    useState<MonitoringInstance>();
  const { data: monitoringInstances = [] } = useMonitoringInstancesList();
  const { mutate: createMonitoringInstance, isLoading: creatingInstance } =
    useCreateMonitoringInstance();
  const { mutate: deleteMonitoringInstance, isLoading: removingInstance } =
    useDeleteMonitoringInstance();
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

  const handleCloseDeleteDialog = () => {
    setSelectedInstance(undefined);
    setOpenDeleteDialog(false);
  };

  const handleDeleteInstance = (instance: MonitoringInstance) => {
    setSelectedInstance(instance);
    setOpenDeleteDialog(true);
  };

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

  const handleConfirmDelete = (instanceName: string) => {
    deleteMonitoringInstance(instanceName, {
      onSuccess: (_, locationName) => {
        updateDataAfterDelete(
          queryClient,
          MONITORING_INSTANCES_QUERY_KEY,
          'name'
        )(_, locationName);
        handleCloseDeleteDialog();
      },
    });
  };

  return (
    <>
      <Table
        hideExpandAllIcon
        data={monitoringInstances}
        columns={columns}
        enableRowActions
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
        renderRowActionMenuItems={({ row, closeMenu }) => [
          <MenuItem
            key={0}
            onClick={() => {
              handleDeleteInstance(row.original);
              closeMenu();
            }}
          >
            <Delete /> Delete
          </MenuItem>,
        ]}
      />
      {openCreateEditModal && (
        <CreateEditEndpointModal
          open={openCreateEditModal}
          handleClose={handleCloseModal}
          handleSubmit={handleSubmitModal}
          isLoading={creatingInstance}
        />
      )}
      {openDeleteDialog && (
        <ConfirmDialog
          isOpen={openDeleteDialog}
          selectedId={selectedInstance?.name || ''}
          closeModal={handleCloseDeleteDialog}
          headerMessage={'Delete monitoring endpoint'}
          handleConfirm={handleConfirmDelete}
          disabledButtons={removingInstance}
        >
          Delete?
        </ConfirmDialog>
      )}
    </>
  );
};
