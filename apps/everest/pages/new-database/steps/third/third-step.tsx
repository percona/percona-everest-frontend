import {
  Box,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { PitrEnabledSection } from './pitrSection/pitr-enabled-section';
import { Messages } from './third-step.messages';
import { StorageLocation } from './third-step.types';
import { TimeSelection } from './timeSelection/time-selection';
import { DbWizardFormFields } from '../../new-database.types';

export const ThirdStep = () => {
  const { control, watch } = useFormContext();
  const backupsEnabled: boolean = watch(DbWizardFormFields.backupsEnabled);
  const pitrEnabled: boolean = watch(DbWizardFormFields.pitrEnabled);
  const fetchedStorageValues = Object.values(StorageLocation);

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
          <Typography variant="sectionHeading">
            {Messages.repeatsEvery}
          </Typography>
          <TimeSelection />
          <Box
            sx={{
              paddingTop: 3,
              paddingBottom: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="sectionHeading">
              {Messages.storageLocation}
            </Typography>
            <Controller
              control={control}
              name={DbWizardFormFields.storageLocation}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  inputProps={{
                    'data-testid': 'select-storage-location',
                  }}
                >
                  {fetchedStorageValues.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
          <Typography variant="h6">{Messages.pitr}</Typography>
          <Typography variant="caption">{Messages.captionPitr}</Typography>
          <SwitchInput
            control={control}
            label={Messages.enablePitr}
            name={DbWizardFormFields.pitrEnabled}
          />
          {pitrEnabled && <PitrEnabledSection />}
        </>
      )}
    </Box>
  );
};
