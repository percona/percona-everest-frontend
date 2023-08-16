// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {
  FormGroup,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { useFormContext } from 'react-hook-form';
import { Messages } from './fourth-step.messages';

import { DbWizardFormFields } from '../../database-form.types';

export const FourthStep = () => {
  const { setValue, watch } = useFormContext();
  const externalAccess = watch(DbWizardFormFields.externalAccess);

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
          <>
            {/* <SwitchInput
              label={Messages.internetFacing}
              name={DbWizardFormFields.internetFacing}
            /> */}
            <TextInput
              name={DbWizardFormFields.sourceRange}
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
