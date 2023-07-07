import React from 'react';
import { ToggleButtonGroupInput } from './toggle-button-group';
import { FormProvider, useForm } from 'react-hook-form';
import { ToggleCard } from '@percona/ui-lib.toggle-card';

export const BasicToggleButtonGroup = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <ToggleButtonGroupInput
        name='numberOfNodes'
        control={methods.control}>
        <ToggleCard
          value='1'
        >
          One node
        </ToggleCard>
        <ToggleCard
          value='twl'
        >
          Two nodes
        </ToggleCard>
      </ToggleButtonGroupInput>
    </FormProvider>
  );
}
