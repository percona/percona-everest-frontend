import React from 'react';
import { TextField } from '@mui/material';
import { LabeledContent } from '@percona/ui-lib.labeled-content';
import { Controller } from 'react-hook-form';
import { TextInputProps } from './text.types';

export const TextInput = ({ control, name, label, labelProps, textFieldProps }: TextInputProps) => {
  const content = <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        variant="outlined"
        error={!!error}
        helperText={error ? error.message : textFieldProps?.helperText}
        inputProps={{
          'data-testid': `text-input-${name}`,
          ...textFieldProps?.inputProps
        }}
        {...textFieldProps}
      />
    )}
  />

  return label ? (
    <LabeledContent label={label} {...labelProps}>{content}</LabeledContent>
  ) : content;
}
