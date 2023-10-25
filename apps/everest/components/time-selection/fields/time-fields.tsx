import { Box, MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';
import { HOURS_AM_PM, MINUTES } from '../time-selection.constants';
import { Messages } from '../time-selection.messages';
import {AmPM, TimeSelectionFields} from '../time-selection.types';
import { addZeroToSingleDigit } from '../time-selection.utils';

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
      {/* @ts-ignore */}
      <Typography variant="sectionHeading">{Messages.at}</Typography>
      <SelectInput
        name={TimeSelectionFields.hour}
        control={control}
        selectFieldProps={{
          sx: { minWidth: '80px' },
        }}
      >
        {HOURS_AM_PM.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </SelectInput>
      <SelectInput
        name={TimeSelectionFields.minute}
        control={control}
        selectFieldProps={{
          sx: { minWidth: '80px' },
        }}
      >
        {MINUTES.map((value) => (
          <MenuItem key={value} value={value}>
            {addZeroToSingleDigit(value)}
          </MenuItem>
        ))}
      </SelectInput>
      <SelectInput
        name={TimeSelectionFields.amPm}
        control={control}
        selectFieldProps={{
          sx: { minWidth: '80px' },
        }}
      >
        <MenuItem value={AmPM.AM}>{Messages.am}</MenuItem>
        <MenuItem value={AmPM.PM}>{Messages.pm}</MenuItem>
      </SelectInput>
    </Box>
  );
};
