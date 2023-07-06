import React from 'react';
import { ToggleButtonGroup } from '@mui/material';
import { LabeledContent } from '@percona/ui-lib.labeled-content';
import { Controller } from 'react-hook-form';
import { ToggleButtonGroupInputProps } from './toggle-button-group.types';

export const ToggleButtonGroupInput = ({
  control,
  name,
  label,
  labelProps,
  toggleButtonGroupProps,
  children,
}: ToggleButtonGroupInputProps) => {
  const content = <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <ToggleButtonGroup
        {...field}
        fullWidth
        exclusive
        data-testd={`toggle-button-group-input-${name}`}
        onChange={(
          event: React.MouseEvent<HTMLElement> | any,
          value: any
        ) => {
          if (value !== null) {
            /* eslint-disable no-param-reassign */
            event.target.value = value;
            field.onChange(event);
          }
        }}
        {...toggleButtonGroupProps}
      >
        {children}
      </ToggleButtonGroup>
    )}
  />

  return label ? (
    <LabeledContent label={label} {...labelProps}>{content}</LabeledContent>
  ) : content;
}
