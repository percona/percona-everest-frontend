import { AutoCompleteInput } from '@percona/ui-lib.form.inputs.auto-complete';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { AutoCompleteAutoFillProps } from './auto-comlete-auto-fill.type';

export function AutoCompleteAutoFill<T>({
  name,
  controllerProps,
  label,
  labelProps,
  autoCompleteProps,
  textFieldProps,
  options,
  loading,
  isRequired,
  enableFillFirst = false,
  fillFirstField = 'name',
}: AutoCompleteAutoFillProps<T>) {
  const { setValue, trigger } = useFormContext();

  useEffect(() => {
    if (enableFillFirst && options?.length > 0) {
      setValue(name, {
        [fillFirstField]: options[0][fillFirstField],
      });
      trigger();
    }
  }, [options]);

  return (
    <AutoCompleteInput
      name={name}
      controllerProps={controllerProps}
      label={label}
      labelProps={labelProps}
      loading={loading}
      options={options}
      textFieldProps={textFieldProps}
      autoCompleteProps={{
        isOptionEqualToValue: (option, value) =>
          option[fillFirstField] === value[fillFirstField],
        getOptionLabel: (option) =>
          typeof option === 'string' ? option : option[fillFirstField],
        ...autoCompleteProps,
      }}
      isRequired={isRequired}
    />
  );
}
