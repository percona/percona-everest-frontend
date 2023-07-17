import React from 'react';
import { AutoCompleteInput } from './auto-complete';
import { FormProvider, useForm } from 'react-hook-form';

export const BasicAutoComplete = () => {
  const methods = useForm({ defaultValues: { company: 'percona' } });

  return (
    <FormProvider {...methods}>
      <AutoCompleteInput
        name='person'
        control={methods.control}
        label="Person"
        options={[{ name: 'John', age: 20 }, { name: 'Ana', age: 22 }]}
        autoCompleteProps={{
          isOptionEqualToValue: (option, value) => option.name === value.name,
          getOptionLabel: (option) => typeof option === 'string' ? option : option.name,
        }}
      />
    </FormProvider>
  );
}