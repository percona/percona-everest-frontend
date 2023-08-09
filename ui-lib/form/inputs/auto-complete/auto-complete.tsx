import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { LabeledContent } from '@percona/ui-lib.labeled-content';
import { kebabize } from '@percona/utils.string';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AutoCompleteInputProps } from './auto-complete.types';

export function AutoCompleteInput<T>({
  name,
  control,
  controllerProps,
  label,
  labelProps,
  autoCompleteProps,
  textFieldProps,
  options,
  loading = false,
}: AutoCompleteInputProps<T>) {
  const { control: contextControl } = useFormContext();
  const content = (
    <Controller
      name={name}
      control={control ?? contextControl}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          options={options}
          freeSolo
          forcePopupIcon
          onChange={(event, newValue) => {
            field.onChange(newValue);
          }}
          // We might generalize this in the future, if we think renderInput should be defined from the outside
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!error}
              helperText={error ? error.message : textFieldProps?.helperText}
              inputProps={{
                'data-testid': `text-input-${kebabize(name)}`,
                ...params.inputProps,
                ...textFieldProps?.inputProps,
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              {...textFieldProps}
            />
          )}
          {...autoCompleteProps}
        />
      )}
      {...controllerProps}
    />
  );

  return label ? (
    <LabeledContent label={label} {...labelProps}>
      {content}
    </LabeledContent>
  ) : (
    content
  );
}
