import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { kebabize } from '../../../../../utils/src';
import { Controller, useFormContext } from 'react-hook-form';
const SwitchInput = ({ name, control, label, labelCaption, controllerProps, formControlLabelProps, switchFieldProps, }) => {
    const { control: contextControl } = useFormContext();
    return (_jsx(FormControlLabel, { label: _jsxs(_Fragment, { children: [_jsx(Typography, { variant: "body1", children: label }), labelCaption && (_jsx(Typography, { variant: "caption", children: labelCaption }))] }), "data-testid": `switch-input-${kebabize(name)}-label`, control: _jsx(Controller, { name: name, control: control ?? contextControl, render: ({ field }) => (_jsx(Switch, { ...field, checked: field.value, "data-testid": `switch-input-${kebabize(name)}`, ...switchFieldProps })), ...controllerProps }), ...formControlLabelProps }));
};
export default SwitchInput;
//# sourceMappingURL=switch.js.map