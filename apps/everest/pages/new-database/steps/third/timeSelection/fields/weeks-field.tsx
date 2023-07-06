import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Messages } from '../../third-step.messages';
import { WeekDays } from '../../third-step.types';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';

export const WeeksField = () => {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="sectionHeading">{Messages.on}</Typography>
      <SelectInput
        name="weekDay"
        control={control}
        selectFieldProps={{
          sx: { minWidth: '120px' }
        }}
      >
        {Object.values(WeekDays).map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </SelectInput>
    </>
  );
};
