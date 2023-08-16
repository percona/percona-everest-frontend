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

import { Box, Typography } from '@mui/material';
import { AutoCompleteInput } from '@percona/ui-lib.form.inputs.auto-complete';
import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TimeSelection } from '../../../../components/time-selection/time-selection';
import { useBackupStorages } from '../../../../hooks/api/backup-storages/useBackupStorages';
import { DbWizardFormFields } from '../../database-form.types';
import { Messages } from './third-step.messages';

export const ThirdStep = () => {
  const { control, watch } = useFormContext();
  const backupsEnabled: boolean = watch(DbWizardFormFields.backupsEnabled);
  // const pitrEnabled: boolean = watch(DbWizardFormFields.pitrEnabled);
  const { data: backupStorages = [], isFetching } = useBackupStorages();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h6">{Messages.backups}</Typography>
      <Typography variant="caption">{Messages.captionBackups}</Typography>
      <SwitchInput
        control={control}
        label={Messages.enableBackups}
        name={DbWizardFormFields.backupsEnabled}
      />
      {backupsEnabled && (
        <>
          {/* @ts-ignore */}
          <Typography variant="sectionHeading">
            {Messages.repeatsEvery}
          </Typography>
          <TimeSelection showInfoAlert />
          <AutoCompleteInput
            name={DbWizardFormFields.storageLocation}
            label={Messages.storageLocation}
            loading={isFetching}
            options={backupStorages}
            autoCompleteProps={{
              isOptionEqualToValue: (option, value) => option.id === value.id,
              getOptionLabel: (option) =>
                typeof option === 'string' ? option : option.name,
            }}
          />
          {/* <Typography variant="h6">{Messages.pitr}</Typography>
          <Typography variant="caption">{Messages.captionPitr}</Typography>
          <SwitchInput
            label={Messages.enablePitr}
            name={DbWizardFormFields.pitrEnabled}
          /> */}
          {/* {pitrEnabled && <PitrEnabledSection />} */}
        </>
      )}
    </Box>
  );
};
