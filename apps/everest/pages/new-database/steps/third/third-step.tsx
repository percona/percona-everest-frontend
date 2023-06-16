import {
  Box,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Messages } from './third-step.messages';
import { TimeSelection } from './timeSelection/time-selection';

export const ThirdStep = () => {
  const { control, watch } = useFormContext();
  const backupsEnabled: boolean = watch('backupsEnabled');
  const pitrEnabled: boolean = watch('pitrEnabled');

  const fetchedStorageValues = ['S3', 'Local'];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography variant="h6">{Messages.backups}</Typography>
      <Typography variant="caption">{Messages.captionBackups}</Typography>
      <FormControlLabel
        label={Messages.enableBackups}
        data-testid="switch-backups-enabled"
        control={
          <Controller
            control={control}
            name="backupsEnabled"
            render={({ field }) => <Switch {...field} checked={field.value} />}
          />
        }
      />
      {backupsEnabled && (
        <>
          <Typography variant="h6">{Messages.repeatsEvery}</Typography>
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
            <Typography variant="h6">{Messages.storageLocation}</Typography>
            <Controller
              control={control}
              name="storageLocation"
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
          <FormControlLabel
            label={Messages.enablePitr}
            data-testid="switch-pitr-enabled"
            control={
              <Controller
                control={control}
                name="pitrEnabled"
                render={({ field }) => (
                  <Switch {...field} checked={field.value} />
                )}
              />
            }
          />
          {pitrEnabled && (
            <>
              <Typography variant="h6">{Messages.pitrCreateHeader}</Typography>
              <Controller
                control={control}
                name="pitrTime"
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    sx={{ width: '150px' }}
                    type="number"
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v !== '' && Number(v) < 1) {
                        field.onChange('1');
                      } else {
                        field.onChange(v);
                      }
                    }}
                    onBlur={(e) => {
                      field.onBlur();
                      const v = e.target.value;
                      if (v === '') {
                        field.onChange('1');
                      }
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        {Messages.minutes}
                      </InputAdornment>
                    }
                    inputProps={{
                      'data-testid': 'pitr-time-minutes',
                    }}
                  />
                )}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
};
