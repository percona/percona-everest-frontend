import {
  FormGroup,
  Typography,
} from '@mui/material';
import React from 'react';

import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { TextArray } from '@percona/ui-lib.form.inputs.text-array';
import { useFormContext } from 'react-hook-form';
import { Messages } from './fourth-step.messages';

import { DbWizardFormFields } from '../../new-database.types';

export const FourthStep = () => {
  const methods = useFormContext();
  const externalAccess = methods.watch(DbWizardFormFields.externalAccess);

  return (
    <>
      <Typography variant="h5">{Messages.externalAccess}</Typography>
      <Typography variant="subtitle2">{Messages.caption}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <SwitchInput
          label={Messages.enableExternalAccess}
          name={DbWizardFormFields.externalAccess}
        />
        {externalAccess && (
          <TextArray fieldName={DbWizardFormFields.sourceRanges} fieldKey='sourceRange' label={Messages.sourceRange} />
        )}
      </FormGroup>
    </>
  );
};
