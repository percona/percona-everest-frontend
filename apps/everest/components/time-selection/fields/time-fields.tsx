import { Box, MenuItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { HOURS_AM_PM, MINUTES } from '../time-selection.constants';
import { AmPM } from '../time-selection.types';
import { addZeroToSingleDigit } from '../time-selection.utils';
import { Messages } from '../time-selection.messages';

export const TimeFields = () => {
  const { control } = useFormContext();

  return (
    <Box
      sx={(theme) => ({
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        [theme.breakpoints.down('sm')]: {
          flexBasis: '100%',
        },
      })}
    >
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
    </Box>
  );
};
