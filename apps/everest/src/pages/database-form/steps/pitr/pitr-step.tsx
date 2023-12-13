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

import { useDatabasePageMode } from '../../useDatabasePageMode';
import { useFormContext } from 'react-hook-form';
import { Alert, Box } from '@mui/material';
import { StepHeader } from '../step-header/step-header';
import { Messages } from './pitr.messages';
import { DbWizardFormFields } from '../../database-form.types';
import { SwitchInput } from '@percona/ui-lib';
import { useEffect } from 'react';
import { Messages as StorageLocationMessages } from 'components/schedule-form/schedule-form.messages';
import { AutoCompleteAutoFill } from 'components/auto-complete-auto-fill/auto-complete-auto-fill';
import { useBackupStorages } from 'hooks/api/backup-storages/useBackupStorages';
import { DbType } from '@percona/types';

const PITRStep = () => {
  const mode = useDatabasePageMode();
  const { control, watch, setValue } = useFormContext();
  const { data: backupStorages = [], isFetching } = useBackupStorages();
  // const { dbClusterData } = useDatabasePageDefaultValues(mode);
  const [pitrEnabled, backupsEnabled, pitrStorageLocation, dbType] = watch([
    DbWizardFormFields.pitrEnabled,
    DbWizardFormFields.backupsEnabled,
    DbWizardFormFields.pitrStorageLocation,
    DbWizardFormFields.dbType
  ]);

  useEffect(() => {

    if (mode === 'new' && backupStorages?.length > 0) {
      setValue(DbWizardFormFields.pitrStorageLocation, {
        name: backupStorages[0].name,
      });
    }
    if (
      (mode === 'edit' || mode === 'restoreFromBackup') &&
      backupStorages?.length > 0 &&
      !pitrStorageLocation
    ) {
      setValue(DbWizardFormFields.pitrStorageLocation, {
        name: backupStorages[0].name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backupStorages, mode, pitrEnabled]);


  useEffect(() => {
    if (dbType !== DbType.Mysql) {
      setValue(DbWizardFormFields.pitrEnabled, false);
    }
  }, [dbType]);

  const pitrDisabled =
    !backupsEnabled || dbType === DbType.Mongo || dbType === DbType.Postresql;

  useEffect(() => {
    if (!backupsEnabled) {
      setValue(DbWizardFormFields.pitrEnabled, false);
    }
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
      {pitrEnabled && (
        <AutoCompleteAutoFill
          name={DbWizardFormFields.pitrStorageLocation}
          label={StorageLocationMessages.storageLocation.label}
          loading={isFetching}
          options={backupStorages}
          autoCompleteProps={{
            isOptionEqualToValue: (option, value) => option.name === value.name,
            getOptionLabel: (option) =>
              typeof option === 'string' ? option : option.name,
          }}
          isRequired
          enableFillFirst={mode === 'new'}
        />
      )}
    </Box>
  );
};

export default PITRStep;
