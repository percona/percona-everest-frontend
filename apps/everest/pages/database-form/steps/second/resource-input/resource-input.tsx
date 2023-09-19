import { TextInput } from '@percona/ui-lib.form.inputs.text';
import React from 'react';
import { ResourceInputProps } from './resource-input.types';
import { InputAdornment } from '@mui/material';

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
