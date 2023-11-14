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

import { Alert, Box, Typography } from '@mui/material';
import { SwitchInput } from '@percona/ui-lib';
import { useFormContext } from 'react-hook-form';
import { DbWizardFormFields } from '../../database-form.types';
import { Messages } from './backups.messages.ts';
import { ScheduleBackupSection } from './schedule-section/schedule-section.tsx';
import { useDatabasePageDefaultValues } from '../../useDatabaseFormDefaultValues.ts';
import { useDatabasePageMode } from '../../useDatabasePageMode.ts';
import { DbType } from '@percona/types';
import { useEffect } from 'react';

export const Backups = () => {
  const mode = useDatabasePageMode();
  const { control, watch, setValue } = useFormContext();
  const { dbClusterData } = useDatabasePageDefaultValues(mode);

  const [backupsEnabled, dbType] = watch([
    DbWizardFormFields.backupsEnabled,
    DbWizardFormFields.dbType,
  ]);

  // TODO should be removed after https://jira.percona.com/browse/EVEREST-509 + DEFAULT_VALUES should be changed from false to true for all databases
  useEffect(() => {
    if (dbType !== DbType.Postresql) {
      setValue(DbWizardFormFields.backupsEnabled, true);
    }
  }, [dbType]);

  // const pitrEnabled: boolean = watch(DbWizardFormFields.pitrEnabled);

  const schedules =
    mode === 'new' ? [] : dbClusterData?.spec?.backup?.schedules || [];
  const multiSchedules =
    mode === 'edit' && !!schedules && schedules?.length > 1;
  const scheduleDisabled = multiSchedules || dbType === DbType.Postresql;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5">{Messages.backups}</Typography>
      <Typography variant="subtitle2">{Messages.captionBackups}</Typography>
      <SwitchInput
        control={control}
        label={Messages.enableBackups}
        name={DbWizardFormFields.backupsEnabled}
        switchFieldProps={{
          disabled: dbType === DbType.Postresql,
        }}
        sx={{ mt: 1 }}
      />
      {backupsEnabled && (
        <>
          {(mode === 'new' || mode === 'restoreFromBackup') && (
            <Alert severity="info">{Messages.youCanAddMoreSchedules}</Alert>
          )}
          {multiSchedules && (
            <Alert severity="info">{Messages.youHaveMultipleSchedules}</Alert>
          )}
          {!scheduleDisabled && <ScheduleBackupSection />}
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
