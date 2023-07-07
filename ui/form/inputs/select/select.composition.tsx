import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { SelectInput } from './select';
import { MenuItem } from '@mui/material';

export const BasicSelect = () => {
  const methods = useForm({ defaultValues: { company: 'percona' } });

  return (
    <FormProvider {...methods}>
      <SelectInput name='company' label='Company' control={methods.control}>
        <MenuItem value='percona'>
          Percona
        </MenuItem>
        <MenuItem value='other'>
          Other
        </MenuItem>
      </SelectInput>
    </FormProvider>
  );
}
