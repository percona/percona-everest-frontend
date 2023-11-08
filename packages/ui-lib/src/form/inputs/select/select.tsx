import { Select } from '@mui/material';
import { kebabize } from '@percona/utils';
import { Controller, useFormContext } from 'react-hook-form';
import { SelectInputProps } from './select.types';
import LabeledContent from '../../../labeled-content';

const SelectInput = ({
  name,
  control,
  label,
  controllerProps,
  labelProps,
  selectFieldProps,
  children,
  isRequired = false,
}: SelectInputProps) => {
  const { control: contextControl } = useFormContext();
  const content = (
    <Controller
      name={name}
      control={control ?? contextControl}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          variant="outlined"
          error={error !== undefined}
          data-testid={`select-${kebabize(name)}-button`}
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

export default SelectInput;
