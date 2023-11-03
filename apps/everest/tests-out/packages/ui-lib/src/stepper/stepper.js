import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment } from 'react';
import { Stepper as MuiStepper, useTheme } from '@mui/material';
const Stepper = ({ noConnector, connector, dataTestId, sx, ...props }) => {
    const theme = useTheme();
    return (_jsx(MuiStepper, { "data-testid": dataTestId, sx: {
            ...(noConnector && {
                '.MuiStep-root': {
                    padding: 0,
                },
            }),
            '.MuiStepIcon-root.Mui-active': {
                color: theme.palette.text.primary,
            },
            '.MuiStepIcon-root.Mui-completed': {
                color: theme.palette.primary.light,
            },
            '.MuiStepLabel-label.Mui-active': {
                color: theme.palette.text.primary,
                fontWeight: 600,
            },
            '.MuiStepLabel-label.Mui-completed': {
                color: theme.palette.text.secondary,
                fontWeight: 600,
            },
            '.MuiStepLabel-label': {
                fontWeight: 600,
            },
            ...sx,
        }, ...props, 
        // eslint-disable-next-line react/jsx-fragments
        connector: noConnector ? _jsx(Fragment, {}) : connector }));
};
export default Stepper;
//# sourceMappingURL=stepper.js.map