import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { kebabize } from '../../../../../utils/src';
import { Controller, useFormContext } from 'react-hook-form';
import LabeledContent from '../../../labeled-content';
function AutoCompleteInput({ name, control, controllerProps, label, labelProps, autoCompleteProps, textFieldProps, options, loading = false, isRequired = false, }) {
    const { control: contextControl } = useFormContext();
    const content = (_jsx(Controller, { name: name, control: control ?? contextControl, render: ({ field, fieldState: { error } }) => (_jsx(Autocomplete, { ...field, options: options, forcePopupIcon: true, onChange: (_, newValue) => {
                field.onChange(newValue);
            }, 
            // We might generalize this in the future, if we think renderInput should be defined from the outside
            renderInput: (params) => (_jsx(TextField, { ...params, error: !!error, helperText: error ? error.message : textFieldProps?.helperText, inputProps: {
                    'data-testid': `text-input-${kebabize(name)}`,
                    ...params.inputProps,
                    ...textFieldProps?.inputProps,
                }, 
                // eslint-disable-next-line react/jsx-no-duplicate-props
                InputProps: {
                    ...params.InputProps,
                    endAdornment: (_jsxs(_Fragment, { children: [loading ? (_jsx(CircularProgress, { color: "inherit", size: 20 })) : null, params.InputProps.endAdornment] })),
                }, ...textFieldProps })), ...autoCompleteProps })), ...controllerProps }));
    return label ? (_jsx(LabeledContent, { label: label, isRequired: isRequired, ...labelProps, children: content })) : (content);
}
export default AutoCompleteInput;
//# sourceMappingURL=auto-complete.js.map