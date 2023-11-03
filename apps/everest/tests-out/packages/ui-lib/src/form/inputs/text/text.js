import { jsx as _jsx } from "react/jsx-runtime";
import { TextField } from '@mui/material';
import { kebabize } from '../../../../../utils/src';
import { Controller, useFormContext } from 'react-hook-form';
import LabeledContent from '../../../labeled-content';
const TextInput = ({ control, name, label, controllerProps, labelProps, textFieldProps, isRequired = false, }) => {
    const { control: contextControl } = useFormContext();
    const content = (_jsx(Controller, { name: name, control: control ?? contextControl, render: ({ field, fieldState: { error } }) => (_jsx(TextField, { ...field, ...textFieldProps, variant: "outlined", error: !!error, inputProps: {
                'data-testid': `text-input-${kebabize(name)}`,
                ...textFieldProps?.inputProps,
            }, helperText: error ? error.message : textFieldProps?.helperText })), ...controllerProps }));
    return label ? (_jsx(LabeledContent, { label: label, isRequired: isRequired, ...labelProps, children: content })) : (content);
};
export default TextInput;
//# sourceMappingURL=text.js.map