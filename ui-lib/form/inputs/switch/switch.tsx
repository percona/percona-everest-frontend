import { FormControlLabel, Switch, Typography } from '@mui/material';
import { kebabize } from '@percona/utils.string';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { SwitchInputProps } from './switch.types';

export const SwitchInput = ({
  name,
  control,
  label,
  labelCaption,
  controllerProps,
  formControlLabelProps,
}: SwitchInputProps) => {
  const { control: contextControl } = useFormContext();
  return (
    <FormControlLabel
      label={
        <>
          <Typography variant='body1'>{label}</Typography>
          {labelCaption && <Typography variant='caption'>{labelCaption}</Typography>}
        </>
      }
      data-testid={`switch-input-${kebabize(name)}-label`}
      sx={{
        alignItems: 'flex-start',
        '& > .MuiTypography-root': {
          pt: 1
        }
      }}
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
