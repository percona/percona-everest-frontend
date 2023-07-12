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
    debugger;
    return (
        <FormControlLabel
            label={label} // formControlLabelProps.label?
            data-testid={`switch-input-${kebabize(name)}`}
            control={
                <Controller
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <Switch {...field} checked={field.value} />
                    )}
                    {...controllerProps}
                />
            }
            {...formControlLabelProps}
        />
    );
}
