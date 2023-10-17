import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AutoCompleteInput } from './auto-complete';

export const BasicAutoComplete = () => {
  const methods = useForm({ defaultValues: { person: '' } });

  return (
    <FormProvider {...methods}>
      <AutoCompleteInput
        name="person"
        control={methods.control}
        label="Person"
        options={[
          { name: 'John', age: 20 },
          { name: 'Ana', age: 22 },
        ]}
        autoCompleteProps={{
          isOptionEqualToValue: (option, value) => option.name === value.name,
          getOptionLabel: (option) =>
            typeof option === 'string' ? option : option.name,
        }}
      />
    </FormProvider>
  );
};
