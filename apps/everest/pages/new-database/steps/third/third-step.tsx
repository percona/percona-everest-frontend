import React from 'react';
import { Box, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { AutoCompleteInput } from '@percona/ui-lib.form.inputs.auto-complete';
import { Messages } from './third-step.messages';
import { DbWizardFormFields } from '../../new-database.types';
import { TimeSelection } from '../../../../components/time-selection/time-selection';
import { useBackupStorages } from '../../../../hooks/api/backup-storages/useBackupStorages';

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
            control={control}
            label={Messages.storageLocation}
            loading={isFetching}
            options={backupStorages}
            autoCompleteProps={{
              isOptionEqualToValue: (option, value) => option.id === value.id,
              getOptionLabel: (option) => typeof option === 'string' ? option : option.name,
            }}
          />
          {/* <Typography variant="h6">{Messages.pitr}</Typography>
          <Typography variant="caption">{Messages.captionPitr}</Typography>
          <SwitchInput
            control={control}
            label={Messages.enablePitr}
            name={DbWizardFormFields.pitrEnabled}
          /> */}
          {/* {pitrEnabled && <PitrEnabledSection />} */}
        </>
      )}
    </Box>
  );
};
