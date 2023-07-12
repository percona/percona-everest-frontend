import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';
import { MINUTES } from '../time-selection.constants';
import { Messages } from '../time-selection.messages';

export const HoursField = () => {
  const { control } = useFormContext();

  return (
    <>
      <Typography sx={{ whiteSpace: 'pre' }} variant="sectionHeading">
        {Messages.onMinute}
      </Typography>
      <SelectInput
        name="minuteHour"
        control={control}
        selectFieldProps={{
          sx: { minWidth: '80px' },
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
