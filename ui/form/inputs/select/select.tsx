import React from 'react';
import { Controller } from 'react-hook-form';
import { Select } from '@mui/material';
import { SelectInputProps } from './select.types';
import { LabeledContent } from '@percona/ui-lib.labeled-content';



export const SelectInput = ({ name, control, label, labelProps, selectFieldProps, children }: SelectInputProps) => {
  const content = <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <Select
        {...field}
        variant="outlined"
        error={error !== undefined}
        inputProps={{
          'data-testid': `select-input-${name}`,
          ...selectFieldProps?.inputProps
        }}
        {...selectFieldProps}
      >
        {children}
      </Select>
    )}
  />

  return label ? (
    <LabeledContent label={label} {...labelProps}>{content}</LabeledContent>
  ) : content;
}
