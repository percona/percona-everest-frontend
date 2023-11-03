import { jsx as _jsx } from "react/jsx-runtime";
import { ToggleButtonGroup } from '@mui/material';
import { kebabize } from '../../../../../utils/src';
import LabeledContent from '../../../labeled-content';
import { Controller, useFormContext } from 'react-hook-form';
const ToggleButtonGroupInput = ({ control, name, label, controllerProps, labelProps, toggleButtonGroupProps, children, }) => {
    const { control: contextControl } = useFormContext();
    const content = (_jsx(Controller, { name: name, control: control ?? contextControl, render: ({ field }) => (_jsx(ToggleButtonGroup, { ...field, fullWidth: true, exclusive: true, "data-testid": `toggle-button-group-input-${kebabize(name)}`, onChange: (event, value) => {
                if (value !== null) {
                    /* eslint-disable no-param-reassign */
                    event.target.value = value;
                    field.onChange(event);
                }
            }, ...toggleButtonGroupProps, children: children })), ...controllerProps }));
    return label ? (_jsx(LabeledContent, { label: label, ...labelProps, children: content })) : (content);
};
export default ToggleButtonGroupInput;
//# sourceMappingURL=toggle-button-group.js.map