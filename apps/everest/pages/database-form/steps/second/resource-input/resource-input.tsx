import { TextInput } from '@percona/ui-lib.form.inputs.text';
import React from 'react';
import { InputAdornment } from '@mui/material';
import { ResourceInputProps } from './resource-input.types';

export const ResourceInput = ({ name, label, helperText, endSuffix }: ResourceInputProps) => (
  <TextInput
    name={name}
    textFieldProps={{
      variant: 'outlined',
      label,
      helperText,
      InputProps: {
        endAdornment: <InputAdornment position="end">{endSuffix}</InputAdornment>,
      },
      InputLabelProps: {
        shrink: true
      }
    }}
  />
);
