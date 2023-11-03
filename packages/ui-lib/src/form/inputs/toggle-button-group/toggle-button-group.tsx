import { ToggleButtonGroup } from '@mui/material';
import { kebabize } from '@percona/utils';
import LabeledContent from '../../../labeled-content';
import { Controller, useFormContext } from 'react-hook-form';
import { ToggleButtonGroupInputProps } from './toggle-button-group.types';

const ToggleButtonGroupInput = ({
  control,
  name,
  label,
  controllerProps,
  labelProps,
  toggleButtonGroupProps,
  children,
}: ToggleButtonGroupInputProps) => {
  const { control: contextControl } = useFormContext();
  const content = (
    <Controller
      name={name}
      control={control ?? contextControl}
      render={({ field }) => (
        <ToggleButtonGroup
          {...field}
          fullWidth
          exclusive
          data-testid={`toggle-button-group-input-${kebabize(name)}`}
          onChange={(
            event: React.MouseEvent<HTMLElement> | any,
            value: any
          ) => {
            if (value !== null) {
              /* eslint-disable no-param-reassign */
              event.target.value = value;
              field.onChange(event);
            }
          }}
          {...toggleButtonGroupProps}
        >
          {children}
        </ToggleButtonGroup>
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
};

export default ToggleButtonGroupInput;
