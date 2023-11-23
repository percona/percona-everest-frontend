import {
  FormControlLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import LabeledContent from '../../../labeled-content';
import { RadioGroupProps } from './radio.types';

const RadioGroup = ({
  name,
  control,
  label,
  controllerProps,
  labelProps,
  radioGroupFieldProps,
  isRequired = false,
  options,
}: RadioGroupProps) => {
  const { control: contextControl } = useFormContext();
  const content = (
    <Controller
      name={name}
      control={control ?? contextControl}
      render={({ field }) => (
        <MuiRadioGroup
          {...field}
          row
          name={`radio-group-${name}`}
          {...radioGroupFieldProps}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option.label}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </MuiRadioGroup>
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

export default RadioGroup;
