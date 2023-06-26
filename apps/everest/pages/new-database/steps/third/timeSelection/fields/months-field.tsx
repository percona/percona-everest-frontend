import { MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { DAYS_MONTH } from '../../third-step.constants';
import { Messages } from '../../third-step.messages';

export const MonthsField = () => {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="sectionHeading">{Messages.onDay}</Typography>
      <Controller
        control={control}
        name="onDay"
        render={({ field }) => (
          <TextField
            {...field}
            sx={{ minWidth: '80px' }}
            select
            inputProps={{
              'data-testid': 'select-day-in-month',
            }}
          >
            {DAYS_MONTH.map((value) => (
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
