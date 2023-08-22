import {
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { TextArray } from '@percona/ui-lib.form.inputs.text-array';
import { useFormContext } from 'react-hook-form';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { Messages } from './fourth-step.messages';

import { DbWizardFormFields } from '../../new-database.types';
import { getParamsPlaceholderFromDbType } from './fourth-step.utils';

export const FourthStep = () => {
  const methods = useFormContext();
  const [
    externalAccess,
    engineParametersEnabled,
    dbType,
  ] = methods.watch([DbWizardFormFields.externalAccess, DbWizardFormFields.engineParametersEnabled, DbWizardFormFields.dbType]);

  return (
    <>
      <Typography variant="h5">{Messages.advanced}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <SwitchInput
          label={Messages.enableExternalAccess.title}
          labelCaption={Messages.enableExternalAccess.caption}
          name={DbWizardFormFields.externalAccess}
        />
        {externalAccess && (
          <Stack sx={{ ml: 6 }}>
            <TextArray fieldName={DbWizardFormFields.sourceRanges} fieldKey='sourceRange' label={Messages.sourceRange} />
          </Stack>
        )}
        <SwitchInput
          label={Messages.engineParameters.title}
          labelCaption={Messages.engineParameters.caption}
          name={DbWizardFormFields.engineParametersEnabled}
          formControlLabelProps={{
            sx: {
              mt: 1,
            }
          }}
        />
        {engineParametersEnabled && (
          <TextInput
            name={DbWizardFormFields.engineParameters}
            textFieldProps={{
              placeholder: getParamsPlaceholderFromDbType(dbType),
              multiline: true,
              minRows: 3,
              sx: {
                ml: 6
              }
            }}
          />
        )}
      </FormGroup>
    </>
  );
};
