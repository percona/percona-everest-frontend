import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';
import { MINUTES } from '../../third-step.constants';
import { Messages } from '../../third-step.messages';

export const HoursField = () => {
  const { control } = useFormContext();

  return (
    <>
      <Typography variant="sectionHeading">{Messages.onMinute}</Typography>
      <SelectInput
        name="minuteHour"
        control={control}
        selectFieldProps={{
          sx: { minWidth: '80px' }
        }}
      >
        {MINUTES.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </SelectInput>
    </>
  );
};
