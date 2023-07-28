import { Select } from '@mui/material';
import { LabeledContent } from '@percona/ui-lib.labeled-content';
import { kebabize } from '@percona/utils.string';
import React from 'react';
import { Controller } from 'react-hook-form';
import { SelectInputProps } from './select.types';

export const SelectInput = ({
  name,
  control,
  label,
  controllerProps,
  labelProps,
  selectFieldProps,
  children,
  isRequired = false,
}: SelectInputProps) => {
  const content = (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          variant="outlined"
          error={error !== undefined}
          inputProps={{
            'data-testid': `select-input-${kebabize(name)}`,
            ...selectFieldProps?.inputProps,
          }}
          {...selectFieldProps}
        >
          {children}
        </Select>
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
