import {
  Alert,
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
import { TimeValue } from './third-step.types';
import { weekDays } from './third-step.utils';

export const ThirdStep = () => {
  const { control, setValue, watch, getValues } = useFormContext();
  const backupsEnabled: boolean = watch('backupsEnabled');
  const pitrEnabled: boolean = watch('pitrEnabled');
  const selectedTime: TimeValue = watch('selectTime');
  console.log(getValues());

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
          <div>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Controller
                control={control}
                name="timeNumbers"
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    sx={{ width: '80px' }}
                    type="number"
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v !== '' && Number(v) < 1) {
                        field.onChange('1');
                      } else {
                        field.onChange(v);
                      }
                    }}
                  />
                )}
              />
              <Controller
                control={control}
                name="selectTime"
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: '120px' }}
                    select
                    inputProps={{
                      'data-testid': 'select-storage-location',
                    }}
                  >
                    {Object.values(TimeValue).map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
              {selectedTime === TimeValue.hours && (
                <>
                  <Typography variant="h6">on minute</Typography>
                  <Controller
                    control={control}
                    name="minute"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        sx={{ width: '80px' }}
                        select
                        inputProps={{
                          'data-testid': 'select-storage-location',
                        }}
                      >
                        {Array.from({ length: 60 }, (_, i) => i).map(
                          (value) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          )
                        )}
                      </TextField>
                    )}
                  />
                </>
              )}
              {selectedTime === TimeValue.weeks && (
                <>
                  <Typography variant="h6">on</Typography>
                  <Controller
                    control={control}
                    name="weekDay"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        inputProps={{
                          'data-testid': 'select-storage-location',
                        }}
                      >
                        {weekDays.map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </>
              )}
              {selectedTime === TimeValue.months && (
                <>
                  <Typography variant="h6">on day</Typography>
                  <Controller
                    control={control}
                    name="onDay"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        inputProps={{
                          'data-testid': 'select-storage-location',
                        }}
                      >
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(
                          (value) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          )
                        )}
                      </TextField>
                    )}
                  />
                </>
              )}
              {(selectedTime === TimeValue.days ||
                selectedTime === TimeValue.weeks ||
                selectedTime === TimeValue.months) && (
                <>
                  <Typography variant="h6">at</Typography>
                  <Controller
                    control={control}
                    name="hour"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        inputProps={{
                          'data-testid': 'select-storage-location',
                        }}
                      >
                        {Array.from({ length: 12 }, (_, i) => i).map(
                          (value) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          )
                        )}
                      </TextField>
                    )}
                  />
                  <Controller
                    control={control}
                    name="minute"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        inputProps={{
                          'data-testid': 'select-storage-location',
                        }}
                      >
                        {Array.from({ length: 60 }, (_, i) => i).map(
                          (value) => (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          )
                        )}
                      </TextField>
                    )}
                  />
                  <Controller
                    control={control}
                    name="amPm"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        inputProps={{
                          'data-testid': 'select-storage-location',
                        }}
                      >
                        <MenuItem value="AM">AM</MenuItem>
                        <MenuItem value="PM">PM</MenuItem>
                      </TextField>
                    )}
                  />
                </>
              )}
            </Box>
          </div>
          <Alert severity="info">This is an info alert — check it out!</Alert>
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
                    sx={{ width: '216px' }}
                    type="number"
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v !== '' && Number(v) < 1) {
                        field.onChange('1');
                      } else {
                        field.onChange(v);
                      }
                    }}
                    endAdornment={
                      <InputAdornment position="end">minutes</InputAdornment>
                    }
                    inputProps={{
                      'data-testid': 'pitr-time-minutes',
                      min: 1,
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
