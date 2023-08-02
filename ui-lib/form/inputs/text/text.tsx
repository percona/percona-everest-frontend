import { TextField } from '@mui/material';
import { LabeledContent } from '@percona/ui-lib.labeled-content';
import { kebabize } from '@percona/utils.string';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextInputProps } from './text.types';

export const TextInput = ({
  control,
  name,
  label,
  controllerProps,
  labelProps,
  textFieldProps,
  isRequired = false,
}: TextInputProps) => {
  const { control: contextControl } = useFormContext();
  const content = (
    <Controller
      name={name}
      control={control ?? contextControl}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          variant="outlined"
          error={!!error}
          helperText={error ? error.message : textFieldProps?.helperText}
          inputProps={{
            'data-testid': `text-input-${kebabize(name)}`,
            ...textFieldProps?.inputProps,
          }}
          {...textFieldProps}
        />
      )}
      {...controllerProps}
    />
  );

  return label ? (
    <LabeledContent label={label} isRequired={isRequired} {...labelProps}>
      {content}
    </LabeledContent>
  ) : (
    content
  );
};
