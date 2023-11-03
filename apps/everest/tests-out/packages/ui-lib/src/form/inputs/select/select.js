import { jsx as _jsx } from "react/jsx-runtime";
import { Select } from '@mui/material';
import { kebabize } from '../../../../../utils/src';
import { Controller, useFormContext } from 'react-hook-form';
import LabeledContent from '../../../labeled-content';
const SelectInput = ({ name, control, label, controllerProps, labelProps, selectFieldProps, children, isRequired = false, }) => {
    const { control: contextControl } = useFormContext();
    const content = (_jsx(Controller, { name: name, control: control ?? contextControl, render: ({ field, fieldState: { error } }) => (_jsx(Select, { ...field, variant: "outlined", error: error !== undefined, "data-testid": `select-${kebabize(name)}-button`, inputProps: {
                'data-testid': `select-input-${kebabize(name)}`,
                ...selectFieldProps?.inputProps,
            }, ...selectFieldProps, children: children })), ...controllerProps }));
    return label ? (_jsx(LabeledContent, { label: label, isRequired: isRequired, ...labelProps, children: content })) : (content);
};
export default SelectInput;
//# sourceMappingURL=select.js.map