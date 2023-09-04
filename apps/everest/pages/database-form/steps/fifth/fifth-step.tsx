import { FormGroup, Typography } from '@mui/material';
import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { DbWizardFormFields } from '../../database-form.types';
import { Messages } from './fifth-step.messages';
import { AutoCompleteInput } from '@percona/ui-lib.form.inputs.auto-complete';
import { useMonitoringInstancesList } from '../../../../hooks/api/monitoring/useMonitoringInstancesList';
import { useDatabasePageMode } from '../../useDatabasePageMode';

export const FifthStep = () => {
  const { watch } = useFormContext();
  const monitoring = watch(DbWizardFormFields.monitoring);
  const monitoringInstance = watch(DbWizardFormFields.monitoringInstance);

  const mode = useDatabasePageMode();
  const { setValue } = useFormContext();

  const { data: monitoringInstances, isFetching: monitoringInstancesLoading } =
    useMonitoringInstancesList();

  useEffect(() => {
    if (mode === 'new') {
      if (monitoring && monitoringInstances?.length) {
        setValue(DbWizardFormFields.monitoringInstance, monitoringInstances[0]);
      }
    }
    if (
        (mode === 'edit' || mode === 'restoreFromBackup') &&
      monitoringInstances?.length &&
        !monitoringInstance
    ) {
      setValue(DbWizardFormFields.monitoringInstance, monitoringInstances[0]);
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
          formControlLabelProps={{
            disabled: !monitoringInstances?.length
          }}
        />
        {monitoring && monitoringInstances?.length && (
          <AutoCompleteInput
            name={DbWizardFormFields.monitoringInstance}
            label={Messages.monitoringInstanceLabel}
            loading={monitoringInstancesLoading}
            options={monitoringInstances || []}
            autoCompleteProps={{
              disableClearable: true,
              getOptionLabel: (option) =>
                typeof option === 'string'
                  ? option
                  : `${option.name} (${option.url})`,
            }}
          />
        )}
      </FormGroup>
    </>
  );
};
