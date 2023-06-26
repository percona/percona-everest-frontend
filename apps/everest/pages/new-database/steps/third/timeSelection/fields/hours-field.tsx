import { MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MINUTES } from '../../third-step.constants';
import { Messages } from '../../third-step.messages';

export const HoursField = () => {
  const { control } = useFormContext();

  return (
    <>
      <Typography variant="sectionHeading">{Messages.onMinute}</Typography>
      <Controller
        control={control}
        name="minuteHour"
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ minWidth: '80px' }}
            select
            inputProps={{
              'data-testid': 'select-minute-in-hour',
            }}
          >
            {MINUTES.map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </>
  );
};
