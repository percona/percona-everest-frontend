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

import { Alert, Box } from '@mui/material';
import { DbType } from '@percona/types';
import { SwitchInput } from '@percona/ui-lib';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { DbWizardFormFields } from '../../database-form.types';
import { StepHeader } from '../step-header/step-header';
import { Messages } from './pitr.messages';
import PitrStorage from './pitr-storage';

const PITRStep = () => {
  const { control, watch, setValue } = useFormContext();

  const [backupsEnabled, dbType] = watch([
    DbWizardFormFields.backupsEnabled,
    DbWizardFormFields.dbType,
  ]);

  const pitrDisabled = !backupsEnabled || dbType === DbType.Postresql;

  useEffect(() => {
    if (dbType === DbType.Postresql && backupsEnabled) {
      setValue(DbWizardFormFields.pitrEnabled, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbType]);

  useEffect(() => {
    if (!backupsEnabled) {
      setValue(DbWizardFormFields.pitrEnabled, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backupsEnabled]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <StepHeader
        pageTitle={Messages.header}
        pageDescription={Messages.description}
      />
      {!backupsEnabled && (
        <Alert severity="info" sx={{ mt: 1 }}>
          {Messages.toEnablePitr}
        </Alert>
      )}
      <SwitchInput
        control={control}
        label={Messages.enablePitr}
        name={DbWizardFormFields.pitrEnabled}
        switchFieldProps={{
          disabled: pitrDisabled,
        }}
        formControlLabelProps={{
          sx: { my: 1 },
        }}
      />
      <PitrStorage />
    </Box>
  );
};

export default PITRStep;
