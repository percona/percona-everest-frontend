import { Typography, FormGroup } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { Messages } from './fifth-step.messages';
import { DbWizardFormFields } from '../../new-database.types';

export const FifthStep = () => {
  const { control, watch } = useFormContext();
  const monitoring = watch(DbWizardFormFields.monitoring);

  return (
    <>
      <Typography variant="h5">{Messages.monitoring}</Typography>
      <Typography variant="subtitle2">{Messages.caption}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <SwitchInput
          control={control}
          label={Messages.monitoringEnabled}
          name={DbWizardFormFields.monitoring}
        />
        {monitoring && (
          <TextInput
            name={DbWizardFormFields.endpoint}
            control={control}
            label={Messages.endpointName}
          />
        )}
      </FormGroup>
    </>
  );
};
