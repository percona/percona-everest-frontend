import { Alert, FormGroup, Typography } from '@mui/material';
import { SwitchInput, AutoCompleteInput } from '@percona/ui-lib';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { DbWizardFormFields } from '../../database-form.types';
import { Messages } from './fifth-step.messages';
import { useMonitoringInstancesList } from 'hooks/api/monitoring/useMonitoringInstancesList';
import { useDatabasePageMode } from '../../useDatabasePageMode';

export const FifthStep = () => {
  const { watch, getValues } = useFormContext();
  const monitoring = watch(DbWizardFormFields.monitoring);
  const mode = useDatabasePageMode();
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
      <Typography variant="h5">{Messages.monitoring}</Typography>
      <Typography variant="subtitle2">{Messages.caption}</Typography>
      {!monitoringInstances?.length && (
        <Alert severity="info" sx={{ mt: 1 }} data-testid="monitoring-warning">
          Database monitoring is currently disabled because monitoring endpoints were not configured during installation.
          To enable database monitoring, run the `everestctl install` command to reinstall Everest.
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
      </FormGroup>
    </>
  );
};
