import { MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MINUTES } from '../time-selection.constants';
import { Messages } from '../time-selection.messages';

export const HoursField = () => {
  const { control } = useFormContext();

  return (
    <>
      <Typography sx={{ whiteSpace: 'pre' }} variant="sectionHeading">
        {Messages.onMinute}
      </Typography>
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
