import {
  Box,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Messages } from './third-step.messages';

export const ThirdStep = () => {
  const { control, setValue, watch, getValues } = useFormContext();
  const backupsEnabled = watch('backupsEnabled');
  const pitrEnabled = watch('pitrEnabled');
  console.log(getValues());

  const fetchedValues = ['S3', 'Local'];
  return (
    <>
      <Box sx={{ mb: 8 }}>
        <Typography variant="h6">{Messages.backups}</Typography>
        <Typography variant="caption">{Messages.captionBackups}</Typography>
        <FormGroup sx={{ mt: 2 }}>
          <FormControlLabel
            label={Messages.enableBackups}
            data-testid="switch-backups-enabled"
            control={
              <Controller
                control={control}
                name="backupsEnabled"
                render={({ field }) => (
                  <Switch {...field} checked={field.value} />
                )}
              />
            }
          />
          {backupsEnabled && (
            <>
              <Typography variant="h6" sx={{ mt: 5 }}>
                {Messages.storageLocation}
              </Typography>
              <Controller
                control={control}
                name="storageLocation"
                rules={{
                  required: 'Need to be set',
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    select
                    error={error !== undefined}
                    helperText={error ? 'need to be set' : ''}
                    inputProps={{
                      'data-testid': 'select-storage-location',
                    }}
                  >
                    {fetchedValues.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </>
          )}
        </FormGroup>
      </Box>
      <Typography variant="h6">{Messages.pitr}</Typography>
      <Typography variant="caption">{Messages.captionPitr}</Typography>
      <FormGroup sx={{ mt: 2 }}>
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
            <Typography variant="h6" sx={{ mt: 5 }}>
              {Messages.pitrCreateHeader}
            </Typography>
            <Controller
              control={control}
              name="pitrTime"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  inputProps={{
                    'data-testid': 'select-pitr-time',
                  }}
                >
                  <MenuItem value={5}>5 minutes</MenuItem>
                  <MenuItem value={60}>1 hour</MenuItem>
                  <MenuItem value={120}>2 hours</MenuItem>
                </TextField>
              )}
            />
          </>
        )}
      </FormGroup>
    </>
  );
};
