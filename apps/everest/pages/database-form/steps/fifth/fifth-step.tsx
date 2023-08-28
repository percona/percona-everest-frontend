import { FormGroup, Typography } from '@mui/material';
import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DbWizardFormFields } from '../../database-form.types';
import { Messages } from './fifth-step.messages';

export const FifthStep = () => {
  const { watch } = useFormContext();
  const monitoring = watch(DbWizardFormFields.monitoring);

  return (
    <>
      <Typography variant="h5">{Messages.monitoring}</Typography>
      <Typography variant="subtitle2">{Messages.caption}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <SwitchInput
          label={Messages.monitoringEnabled}
          name={DbWizardFormFields.monitoring}
        />
        {monitoring && (
          <TextInput
            name={DbWizardFormFields.endpoint}
            label={Messages.endpointName}
          />
        )}
      </FormGroup>
    </>
  );
};
