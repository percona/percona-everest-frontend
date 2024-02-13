import { Alert, Button, FormGroup } from '@mui/material';
import { AutoCompleteInput, SwitchInput } from '@percona/ui-lib';
import {
  MONITORING_INSTANCES_QUERY_KEY,
  useCreateMonitoringInstance,
  useMonitoringInstancesList,
} from 'hooks/api/monitoring/useMonitoringInstancesList';
import { CreateEditEndpointModal } from 'pages/settings/monitoring-endpoints/createEditModal/create-edit-modal.tsx';
import { EndpointFormType } from 'pages/settings/monitoring-endpoints/createEditModal/create-edit-modal.types.ts';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { updateDataAfterCreate } from 'utils/generalOptimisticDataUpdate.ts';
import { DbWizardFormFields } from '../../database-form.types';
import { useDatabasePageMode } from '../../useDatabasePageMode';
import { StepHeader } from '../step-header/step-header.tsx';
import { Messages } from './fifth-step.messages';

export const FifthStep = () => {
  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
  const queryClient = useQueryClient();
  const { watch, getValues } = useFormContext();
  const monitoring = watch(DbWizardFormFields.monitoring);
  const mode = useDatabasePageMode();
  const { mutate: createMonitoringInstance, isLoading: creatingInstance } =
    useCreateMonitoringInstance();
  const { setValue } = useFormContext();

  const { data: monitoringInstances, isFetching: monitoringInstancesLoading } =
    useMonitoringInstancesList();

  const monitoringInstancesOptions = (monitoringInstances || []).map(
    (instance) => instance.name
  );

  const getInstanceOptionLabel = (instanceName: string) => {
    const instance = monitoringInstances?.find(
      (inst) => inst.name === instanceName
    );

    return instance ? `${instance.name} (${instance.url})` : '';
  };

  const handleCloseModal = () => {
    setOpenCreateEditModal(false);
  };

  const handleSubmitModal = (
    _,
    { name, url, targetNamespaces, ...pmmData }: EndpointFormType
  ) => {
    createMonitoringInstance(
      { name, url, type: 'pmm', targetNamespaces, pmm: { ...pmmData } },
      {
        onSuccess: (newInstance) => {
          updateDataAfterCreate(
            queryClient,
            MONITORING_INSTANCES_QUERY_KEY
          )(newInstance);
          handleCloseModal();
        },
      }
    );
  };

  useEffect(() => {
    const selectedInstance = getValues(DbWizardFormFields.monitoringInstance);

    if (mode === 'new') {
      if (monitoring && monitoringInstances?.length) {
        setValue(
          DbWizardFormFields.monitoringInstance,
          monitoringInstances[0].name
        );
      }
    }
    if (
      (mode === 'edit' || mode === 'restoreFromBackup') &&
      monitoringInstances?.length &&
      !selectedInstance
    ) {
      setValue(
        DbWizardFormFields.monitoringInstance,
        monitoringInstances[0].name
      );
    }
  }, [monitoring]);

  return (
    <>
      <StepHeader
        pageTitle={Messages.monitoring}
        pageDescription={Messages.caption}
      />
      {!monitoringInstances?.length && (
        <Alert
          severity="info"
          sx={{ mt: 1 }}
          data-testid="monitoring-warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => setOpenCreateEditModal(true)}
            >
              {Messages.addMonitoringEndpoint}
            </Button>
          }
        >
          {Messages.alertText}
        </Alert>
      )}
      <FormGroup sx={{ mt: 2 }}>
        <SwitchInput
          label={Messages.monitoringEnabled}
          name={DbWizardFormFields.monitoring}
          switchFieldProps={{
            disabled: !monitoringInstances?.length,
          }}
        />
        {monitoring && monitoringInstances?.length && (
          <AutoCompleteInput
            name={DbWizardFormFields.monitoringInstance}
            label={Messages.monitoringInstanceLabel}
            loading={monitoringInstancesLoading}
            options={monitoringInstancesOptions}
            autoCompleteProps={{
              disableClearable: true,
              renderOption: (props, option) => (
                <li {...props}>{getInstanceOptionLabel(option)}</li>
              ),
            }}
          />
        )}
        {openCreateEditModal && (
          <CreateEditEndpointModal
            open={openCreateEditModal}
            handleClose={handleCloseModal}
            handleSubmit={handleSubmitModal}
            isLoading={creatingInstance}
          />
        )}
      </FormGroup>
    </>
  );
};
