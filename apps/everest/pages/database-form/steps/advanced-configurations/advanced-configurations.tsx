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

import { FormGroup, Typography, Stack } from '@mui/material';
import React from 'react';

import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { TextArray } from '@percona/ui-lib.form.inputs.text-array';
import { useFormContext } from 'react-hook-form';
import { Messages } from './advanced-configurations.messages';
import { getParamsPlaceholderFromDbType } from './advanced-configurations.utils';

import { DbWizardFormFields } from '../../database-form.types';

export const AdvancedConfigurations = () => {
  const methods = useFormContext();
  const [externalAccess, engineParametersEnabled, dbType] = methods.watch([
    DbWizardFormFields.externalAccess,
    DbWizardFormFields.engineParametersEnabled,
    DbWizardFormFields.dbType,
  ]);

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
            <TextArray
              fieldName={DbWizardFormFields.sourceRanges}
              fieldKey="sourceRange"
              label={Messages.sourceRange}
            />
          </Stack>
        )}
        <SwitchInput
          label={Messages.engineParameters.title}
          labelCaption={Messages.engineParameters.caption}
          name={DbWizardFormFields.engineParametersEnabled}
          formControlLabelProps={{
            sx: {
              mt: 1,
            },
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
                ml: 6,
              },
            }}
          />
        )}
      </FormGroup>
    </>
  );
};
