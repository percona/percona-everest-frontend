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

type TimeValuesEnum = ['hours', 'days', 'weeks', 'months'];
export type TimeValue = 'hours' | 'days' | 'weeks' | 'months';

export const ThirdStep = () => {
  const { control, setValue, watch, getValues } = useFormContext();
  const backupsEnabled = watch('backupsEnabled');
  const pitrEnabled = watch('pitrEnabled');
  const selectedTime: TimeValue = watch('selectTime');

  console.log(getValues());

  const fetchedStorageValues = ['S3', 'Local'];
  const weekDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const timeValues: TimeValuesEnum = ['hours', 'days', 'weeks', 'months'];

  const getNumber = (selectedTime: TimeValue) => {
    if (selectedTime === 'hours') {
      return 24;
    } else if (selectedTime === 'days') {
      return 31;
    } else if (selectedTime === 'weeks') {
      return 52;
    } else {
      return 12;
    }
  };

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
            <div>
              <Box>
                <Typography variant="h6" sx={{ mt: 5 }}>
                  {Messages.repeatsEvery}
                </Typography>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <Controller
                    control={control}
                    name="timeOf"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        inputProps={{
                          'data-testid': 'select-storage-location',
                        }}
                      >
                        {Array.from(
                          { length: getNumber(selectedTime) },
                          (_, i) => i + 1
                        ).map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                  <Controller
                    control={control}
                    name="selectTime"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        select
                        inputProps={{
                          'data-testid': 'select-storage-location',
                        }}
                      >
                        {timeValues.map((value) => (
                          <MenuItem key={value} value={value}>
                            {value}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                  {selectedTime === 'hours' && (
                    <>
                      <Typography variant="h6">on minute</Typography>
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
                    </>
                  )}
                  {selectedTime === 'weeks' && (
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
                  {selectedTime === 'months' && (
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
                  {(selectedTime === 'days' ||
                    selectedTime === 'weeks' ||
                    selectedTime === 'months') && (
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
              </Box>
              <div>
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
                      {fetchedStorageValues.map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
            </div>
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
