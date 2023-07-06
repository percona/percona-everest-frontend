import {
  Box,
  MenuItem,
  Typography,
} from '@mui/material';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { PitrEnabledSection } from './pitrSection/pitr-enabled-section';
import { Messages } from './third-step.messages';
import { StorageLocation } from './third-step.types';
import { TimeSelection } from './timeSelection/time-selection';
import { DbWizardFormFields } from '../../new-database.types';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';

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
          <SelectInput
            name={DbWizardFormFields.storageLocation}
            control={control}
            label={Messages.storageLocation}
          >
            {fetchedStorageValues.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </SelectInput>
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
