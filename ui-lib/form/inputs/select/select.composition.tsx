import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MenuItem } from '@mui/material';
import { SelectInput } from './select';

export const BasicSelect = () => {
  const methods = useForm({ defaultValues: { company: 'percona' } });

  return (
    <FormProvider {...methods}>
      <SelectInput name="company" label="Company" control={methods.control}>
        <MenuItem value="percona">Percona</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </SelectInput>
    </FormProvider>
  );
};
