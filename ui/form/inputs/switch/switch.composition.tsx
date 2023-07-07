import React from 'react';
import { SwitchInput } from './switch';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

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
