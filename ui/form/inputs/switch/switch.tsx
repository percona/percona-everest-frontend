import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControlLabel, Switch } from '@mui/material';
import { kebabize } from '@percona/utils.string';
import { SwitchInputProps } from './switch.types';

export const SwitchInput = ({
  name,
  control,
  label,
  controllerProps,
  formControlLabelProps,
}: SwitchInputProps) => {
    return (
        <FormControlLabel
            label={label}
            data-testid={`switch-input-${kebabize(name)}-label`}
            control={
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Switch {...field} checked={field.value} data-testid={`switch-input-${kebabize(name)}`} />
                    )}
                    {...controllerProps}
                />
            }
            {...formControlLabelProps}
        />
    );
}
