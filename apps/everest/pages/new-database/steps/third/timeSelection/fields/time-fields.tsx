import { MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { HOURS_AM_PM, MINUTES } from '../../third-step.constants';
import { Messages } from '../../third-step.messages';
import { AmPM } from '../../third-step.types';
import { addZeroToSingleDigit } from '../../third-step.utils';

export const TimeFields = () => {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="sectionHeading">{Messages.at}</Typography>
      <Controller
        control={control}
        name="hour"
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ minWidth: '80px' }}
            select
            inputProps={{
              'data-testid': 'select-hour',
            }}
          >
            {HOURS_AM_PM.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        control={control}
        name="minute"
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ minWidth: '80px' }}
            select
            inputProps={{
              'data-testid': 'select-minute',
            }}
          >
            {MINUTES.map((value) => (
              <MenuItem key={value} value={value}>
                {addZeroToSingleDigit(value)}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        control={control}
        name="amPm"
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ minWidth: '80px' }}
            select
            inputProps={{
              'data-testid': 'select-am-pm',
            }}
          >
            <MenuItem value={AmPM.AM}>{Messages.am}</MenuItem>
            <MenuItem value={AmPM.PM}>{Messages.pm}</MenuItem>
          </TextField>
        )}
      />
    </>
  );
};
