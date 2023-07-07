import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TextInput } from './text';

export const BasicText = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <TextInput
        control={methods.control}
        name='name'
        label='Name'
        textFieldProps={{
          placeholder: 'Insert your name'
        }}
      />
    </FormProvider>
  );
}
