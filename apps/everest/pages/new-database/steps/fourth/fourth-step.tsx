import {
  FormGroup,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from 'react-hook-form';
import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { Messages } from './fourth-step.messages';

import { DbWizardFormFields } from '../../new-database.types';

export const FourthStep = () => {
  const { control, setValue, watch } = useFormContext();
  const externalAccess = watch(DbWizardFormFields.externalAccess);

  return (
    <>
      <Typography variant="h5">{Messages.externalAccess}</Typography>
      <Typography variant="subtitle2">{Messages.caption}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <SwitchInput
          control={control}
          label={Messages.enableExternalAccess}
          name={DbWizardFormFields.externalAccess}
        />
        {externalAccess && (
          <>
            <SwitchInput
              control={control}
              label={Messages.internetFacing}
              name={DbWizardFormFields.internetFacing}
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
                },
              }}
            />
          </>
        )}
      </FormGroup>
    </>
  );
};
