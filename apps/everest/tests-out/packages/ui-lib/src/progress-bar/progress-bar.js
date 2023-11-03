import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, LinearProgress } from '@mui/material';
const ProgressBar = ({ dataTestId, value, buffer, total, label, }) => {
    const value1Percentage = (value / total) * 100;
    const value2Percentage = (buffer / total) * 100;
    const isOverLimit = value2Percentage > 100;
    return (_jsxs(Box, { sx: {
            display: 'flex',
            flexDirection: 'column',
            height: '37px',
            width: '100%',
        }, children: [_jsx(Box, { sx: { alignSelf: 'end', fontSize: '12px' }, "data-testid": dataTestId ? `${dataTestId}-label` : 'progress-bar-label', children: label }), _jsx(LinearProgress, { variant: "buffer", value: value1Percentage, valueBuffer: value2Percentage, "data-testid": dataTestId ?? 'progress-bar', sx: {
                    '&': {
                        padding: '4px',
                        backgroundColor: 'action.selected',
                        borderRadius: '32px',
                    },
                    '& .MuiLinearProgress-bar': {
                        margin: '1.6px',
                        borderRadius: '32px',
                    },
                    '& .MuiLinearProgress-dashed': {
                        display: 'none',
                    },
                    '& .MuiLinearProgress-bar1Buffer': {
                        display: isOverLimit ? 'none' : 'block',
                    },
                    '& .MuiLinearProgress-bar2Buffer': {
                        backgroundColor: isOverLimit
                            ? 'warning.main'
                            : 'primary.contrastText',
                        transform: isOverLimit ? 'none !important' : undefined,
                    },
                } })] }));
};
export default ProgressBar;
//# sourceMappingURL=progress-bar.js.map