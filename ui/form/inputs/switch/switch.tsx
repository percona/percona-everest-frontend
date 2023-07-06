import React from 'react';
import { Controller } from 'react-hook-form';
import { FormControlLabel, Switch } from '@mui/material';
import { SwitchInputProps } from './switch.types';

export const SwitchInput = ({ name, control, label }: SwitchInputProps) => (
  <FormControlLabel
    label={label}
    control={
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Switch {...field} checked={field.value} />
        )}
      />
    }
  />
);
