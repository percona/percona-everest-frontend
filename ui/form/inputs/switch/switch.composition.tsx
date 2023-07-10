import React from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { SwitchInput } from './switch';

interface FormValues extends FieldValues {
  backupsEnabled: boolean;
};

export const BasicSwitch = () => {
  const methods = useForm<FormValues>({ defaultValues: { backupsEnabled: false } });

  return (
    <FormProvider {...methods}>
      <SwitchInput
        control={methods.control}
        label='Backups'
        name='backupsEnabled'
      />
    </FormProvider>
  );
}
