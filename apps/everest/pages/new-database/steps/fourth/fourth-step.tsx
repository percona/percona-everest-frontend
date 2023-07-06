import {
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Switch,
  Typography,
} from '@mui/material';
import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useFormContext } from 'react-hook-form';
import { Messages } from './fourth-step.messages';

import { IP_RANGE_PATTERN } from './fourth-step.constants';
import { DbWizardFormFields } from '../../new-database.types';
import { TextInput } from '@percona/ui-lib.form.inputs.text';

export const FourthStep = () => {
  const { control, setValue, watch } = useFormContext();
  const externalAccess = watch(DbWizardFormFields.externalAccess);

  return (
    <>
      <Typography variant="h5">{Messages.externalAccess}</Typography>
      <Typography variant="subtitle2">{Messages.caption}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <FormControlLabel
          label={Messages.enableExternalAccess}
          data-testid="switch-external-access"
          control={
            <Controller
              control={control}
              name={DbWizardFormFields.externalAccess}
              render={({ field }) => (
                <Switch {...field} checked={field.value} />
              )}
            />
          }
        />
        {externalAccess && (
          <>
            <FormControlLabel
              label={Messages.internetFacing}
              data-testid="switch-internet-facing"
              control={
                <Controller
                  control={control}
                  name={DbWizardFormFields.internetFacing}
                  render={({ field }) => (
                    <Switch {...field} checked={field.value} />
                  )}
                />
              }
            />
            <TextInput
              name={DbWizardFormFields.sourceRange}
              control={control}
              label={Messages.sourceRange}
              textFieldProps={{
                placeholder: Messages.sourceRangePlaceholder,
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        data-testid="delete-button"
                        onClick={() =>
                          setValue('sourceRange', '', {
                            shouldValidate: true,
                          })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
            />
          </>
        )}
      </FormGroup>
    </>
  );
};
