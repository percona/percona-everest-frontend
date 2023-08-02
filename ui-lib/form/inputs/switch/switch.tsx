import { FormControlLabel, Switch } from '@mui/material';
import { kebabize } from '@percona/utils.string';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SwitchInputProps } from './switch.types';

export const SwitchInput = ({
  name,
  control,
  label,
  controllerProps,
  formControlLabelProps,
}: SwitchInputProps) => {
  const { control: contextControl } = useFormContext();
  return (
    <FormControlLabel
      label={label}
      data-testid={`switch-input-${kebabize(name)}-label`}
      control={
        <Controller
          name={name}
          control={control ?? contextControl}
          render={({ field }) => (
            <Switch
              {...field}
              checked={field.value}
              data-testid={`switch-input-${kebabize(name)}`}
            />
          )}
          {...controllerProps}
        />
      }
      {...formControlLabelProps}
    />
  );
};
