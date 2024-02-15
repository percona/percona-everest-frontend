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
import { DbType } from '@percona/types';
import { SwitchInput } from '@percona/ui-lib';
import { AutoCompleteAutoFill } from 'components/auto-complete-auto-fill/auto-complete-auto-fill';
import { Messages as StorageLocationMessages } from 'components/schedule-form/schedule-form.messages';
import { useBackupStorages } from 'hooks/api/backup-storages/useBackupStorages';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { DbWizardFormFields } from '../../database-form.types';
import { useDatabasePageMode } from '../../useDatabasePageMode';
import { StepHeader } from '../step-header/step-header';
import { Messages } from './pitr.messages';

const PITRStep = () => {
  const mode = useDatabasePageMode();
  const { control, watch, setValue } = useFormContext();
  const { data: backupStorages = [], isFetching } = useBackupStorages();

  const [
    pitrEnabled,
    backupsEnabled,
    pitrStorageLocation,
    dbType,
    storageLocation,
    selectedNamespace,
  ] = watch([
    DbWizardFormFields.pitrEnabled,
    DbWizardFormFields.backupsEnabled,
    DbWizardFormFields.pitrStorageLocation,
    DbWizardFormFields.dbType,
    DbWizardFormFields.storageLocation,
    DbWizardFormFields.k8sNamespace,
  ]);

  const availableBackupStorages = useMemo(
    () =>
      backupStorages.filter((item) =>
        item.targetNamespaces.includes(selectedNamespace)
      ),
    [selectedNamespace, backupStorages]
  );

  useEffect(() => {
    if (availableBackupStorages?.length > 0) {
      if (mode === 'new') {
        setValue(DbWizardFormFields.pitrStorageLocation, {
          name: availableBackupStorages[0].name,
        });
      }
      if (
        (mode === 'edit' || mode === 'restoreFromBackup') &&
        !pitrStorageLocation
      ) {
        setValue(DbWizardFormFields.pitrStorageLocation, {
          name: availableBackupStorages[0].name,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableBackupStorages, mode, pitrEnabled]);

  useEffect(() => {
    if (dbType === DbType.Postresql || backupsEnabled) {
      setValue(DbWizardFormFields.pitrEnabled, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbType]);

  useEffect(() => {
    if (!backupsEnabled) {
      setValue(DbWizardFormFields.pitrEnabled, false);
    }

    if (
      pitrEnabled &&
      (dbType === DbType.Mongo || dbType === DbType.Postresql) &&
      storageLocation
    ) {
      setValue(DbWizardFormFields.pitrStorageLocation, storageLocation);
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
          disabled: dbType === DbType.Postresql,
        }}
        formControlLabelProps={{
          sx: { my: 1 },
        }}
      />
      {pitrEnabled && dbType === DbType.Mysql && (
        <AutoCompleteAutoFill
          name={DbWizardFormFields.pitrStorageLocation}
          label={StorageLocationMessages.storageLocation.label}
          loading={isFetching}
          options={availableBackupStorages}
          isRequired
          enableFillFirst={mode === 'new'}
        />
      )}
      {pitrEnabled &&
        (dbType === DbType.Mongo || dbType === DbType.Postresql) && (
          <Typography variant="body1">
            {Messages.matchedStorageType(storageLocation.name)}
          </Typography>
        )}
    </Box>
  );
};

export default PITRStep;
