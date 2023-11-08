import { AutoCompleteInput } from '@percona/ui-lib';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { AutoCompleteAutoFillProps } from './auto-complete-auto-fill.types';

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
        // @ts-ignore
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
          // @ts-ignore
          option[fillFirstField] === value[fillFirstField],
        getOptionLabel: (option) =>
          // @ts-ignore
          typeof option === 'string' ? option : option[fillFirstField],
        ...autoCompleteProps,
      }}
      isRequired={isRequired}
    />
  );
}
