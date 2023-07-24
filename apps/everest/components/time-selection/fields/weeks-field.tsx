import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';
import { Messages } from '../time-selection.messages';
import { WeekDays, weekDaysPlural } from '../time-selection.types';

export const WeeksField = () => {
  const { control } = useFormContext();
  return (
    <>
      {/* @ts-ignore */}
      <Typography variant="sectionHeading">{Messages.on}</Typography>
      <SelectInput
        name="weekDay"
        control={control}
        selectFieldProps={{
          sx: { minWidth: '120px' },
        }}
      >
        {Object.values(WeekDays).map((value) => (
          <MenuItem key={value} value={value}>
            {weekDaysPlural(value)}
          </MenuItem>
        ))}
      </SelectInput>
    </>
  );
};
