import { MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { WeekDays } from '../time-selection.types';
import { Messages } from '../time-selection.messages';

export const WeeksField = () => {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="sectionHeading">{Messages.on}</Typography>
      <Controller
        control={control}
        name="weekDay"
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ minWidth: '120px' }}
            select
            inputProps={{
              'data-testid': 'select-week-day',
            }}
          >
            {Object.values(WeekDays).map((value) => (
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
