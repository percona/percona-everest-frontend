import { jsx as _jsx } from "react/jsx-runtime";
import { ToggleButton, useTheme } from '@mui/material';
const ToggleCard = ({ children, sx, ...props }) => {
    const theme = useTheme();
    return (_jsx(ToggleButton, { disableRipple: true, sx: {
            backgroundColor: 'background.default',
            boxShadow: 4,
            color: 'black',
            textTransform: 'none',
            border: 'none',
            ':hover, &.Mui-selected:hover': {
                backgroundColor: 'action.hover',
            },
            '&.Mui-selected': {
                outlineStyle: 'solid',
                outlineWidth: '2px',
                // @ts-ignore
                outlineColor: theme.palette.action.outlinedBorder,
                backgroundColor: 'background.default',
            },
            '&.MuiToggleButtonGroup-grouped': {
                '&:not(:last-of-type)': {
                    borderTopRightRadius: `${theme.shape.borderRadius}px`,
                    borderBottomRightRadius: `${theme.shape.borderRadius}px`,
                    [theme.breakpoints.down('sm')]: {
                        mb: 1,
                    },
                    [theme.breakpoints.up('sm')]: {
                        mr: 1,
                    },
                },
                '&:not(:first-of-type)': {
                    borderTopLeftRadius: `${theme.shape.borderRadius}px`,
                    borderBottomLeftRadius: `${theme.shape.borderRadius}px`,
                },
            },
            '&.MuiButtonBase-root': {
                wordWrap: 'break-word',
                whiteSpace: 'pre-wrap',
            },
            ...sx,
        }, ...props, children: children }));
};
export default ToggleCard;
//# sourceMappingURL=toggle-card.js.map