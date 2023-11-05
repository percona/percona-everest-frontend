import { FormGroup, Typography } from '@mui/material';
import { SwitchInput, AutoCompleteInput } from '@percona/ui-lib';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { DbWizardFormFields } from '../../database-form.types';
import { Messages } from './fifth-step.messages';
import { useMonitoringInstancesList } from 'hooks/api/monitoring/useMonitoringInstancesList';
import { useDatabasePageMode } from '../../useDatabasePageMode';

export const FifthStep = () => {
  const { watch } = useFormContext();
  const monitoring = watch(DbWizardFormFields.monitoring);
  const monitoringInstance = watch(DbWizardFormFields.monitoringInstance);

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
      !monitoringInstance
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
