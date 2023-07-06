import {
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from '@mui/material';
import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Messages } from './fifth-step.messages';
import { DbWizardFormFields } from '../../new-database.types';
import { TextInput } from '@percona/ui-lib.form.inputs.text';

export const FifthStep = () => {
  const { control, watch } = useFormContext();
  const monitoring = watch(DbWizardFormFields.monitoring);

  return (
    <>
      <Typography variant="h5">{Messages.monitoring}</Typography>
      <Typography variant="subtitle2">{Messages.caption}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <FormControlLabel
          label={Messages.monitoringEnabled}
          data-testid="switch-monitoring"
          control={
            <Controller
              control={control}
              name={DbWizardFormFields.monitoring}
              render={({ field }) => (
                <Switch {...field} checked={field.value} />
              )}
            />
          }
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
