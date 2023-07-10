import { MenuItem, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectInput } from '@percona/ui-lib.form.inputs.select';
import { DAYS_MONTH } from '../../third-step.constants';
import { Messages } from '../../third-step.messages';

export const MonthsField = () => {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="sectionHeading">{Messages.onDay}</Typography>
      <SelectInput
        name="onDay"
        control={control}
        selectFieldProps={{
          sx: { minWidth: '80px' }
        }}
      >
        {DAYS_MONTH.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </SelectInput>
    </>
  );
};
