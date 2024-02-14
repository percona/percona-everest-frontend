import { Alert, FormGroup, Typography } from '@mui/material';
import {
  AutoCompleteInput,
  CopyToClipboardButton,
  SwitchInput,
} from '@percona/ui-lib';
import { useMonitoringInstancesList } from 'hooks/api/monitoring/useMonitoringInstancesList';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { DbWizardFormFields } from '../../database-form.types';
import { useDatabasePageMode } from '../../useDatabasePageMode';
import { StepHeader } from '../step-header/step-header.tsx';
import { Messages } from './monitoring.messages';

export const Monitoring = () => {
  const { watch, getValues } = useFormContext();
  const monitoring = watch(DbWizardFormFields.monitoring);
  const selectedNamespace = watch(DbWizardFormFields.k8sNamespace);

  const mode = useDatabasePageMode();
  const { setValue } = useFormContext();

  const { data: monitoringInstances, isFetching: monitoringInstancesLoading } =
    useMonitoringInstancesList();

  const availableMonitoringInstances = useMemo(
    () =>
      (monitoringInstances || []).filter((item) =>
        item.targetNamespaces.includes(selectedNamespace)
      ),
    [monitoringInstances, selectedNamespace]
  );

  const monitoringInstancesOptions = availableMonitoringInstances.map(
    (item) => item.name
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
      if (monitoring && availableMonitoringInstances?.length) {
        setValue(
          DbWizardFormFields.monitoringInstance,
          availableMonitoringInstances[0].name
        );
      }
    }
    if (
      (mode === 'edit' || mode === 'restoreFromBackup') &&
      availableMonitoringInstances?.length &&
      !selectedInstance
    ) {
      setValue(
        DbWizardFormFields.monitoringInstance,
        availableMonitoringInstances[0].name
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
        <Alert severity="info" sx={{ mt: 1 }} data-testid="monitoring-warning">
          {Messages.alertText}
          <Alert
            severity="info"
            icon={false}
            sx={{
              mt: 0.5,
              mb: 0.5,
              px: 0,
              maxWidth: '260px',
              border: 'none',
              '& .MuiAlert-action': {
                alignItems: 'center',
                pt: 0,
                px: 0,
              },
            }}
            action={
              <CopyToClipboardButton
                buttonProps={{ size: 'small', color: 'primary' }}
                textToCopy={Messages.command}
              />
            }
          >
            <Typography
              variant="button"
              sx={{ fontSize: '15px', fontWeight: 600 }}
            >
              {Messages.command}
            </Typography>
          </Alert>
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