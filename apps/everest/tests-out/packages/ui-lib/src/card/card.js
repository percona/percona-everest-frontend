import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card as MuiCard, Typography, CardContent, Box, Button, CardActions, } from '@mui/material';
import { kebabize } from '../../../utils/src';
const Card = ({ title, content, sx, cardActions, headerProps, cardContentProps, contentWrapperProps, cardActionsProps, dataTestId, ...props }) => {
    return (_jsx(MuiCard, { "data-testid": `${dataTestId}-card`, sx: { width: '320px', height: 'fit-content', ...sx }, ...props, children: _jsxs(CardContent, { "data-testid": `${dataTestId}-card-content`, ...cardContentProps, sx: {
                '&:last-child': {
                    p: 2,
                },
                ...cardContentProps?.sx,
            }, children: [title && (_jsx(Typography, { "data-testid": `${dataTestId}-card-header`, variant: "h5", ...headerProps, sx: { mb: 4, ...headerProps?.sx }, children: title })), _jsx(Box, { "data-testid": `${dataTestId}-card-content-wrapper`, ...contentWrapperProps, children: content }), cardActions && (_jsx(CardActions, { "data-testid": `${dataTestId}-card-actions`, ...cardActionsProps, sx: { p: 0, mt: 4, ...cardActionsProps?.sx }, children: cardActions.map(({ text, ...buttonProps }) => (_jsx(Button, { "data-testid": `${kebabize(text)}-button`, ...buttonProps, children: text }, text))) }))] }) }));
};
export default Card;
//# sourceMappingURL=card.js.map