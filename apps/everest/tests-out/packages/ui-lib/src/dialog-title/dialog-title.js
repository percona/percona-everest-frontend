import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle as MuiDialogTitle, IconButton } from '@mui/material';
const DialogTitle = ({ onClose, children, ...props }) => (_jsxs(MuiDialogTitle, { ...props, children: [children, onClose ? (_jsx(IconButton, { "aria-label": "close", "data-testid": "close-dialog-icon", onClick: onClose, sx: {
                position: 'absolute',
                p: 2,
                top: 0,
                right: 0,
            }, children: _jsx(CloseIcon, {}) })) : null] }));
export default DialogTitle;
//# sourceMappingURL=dialog-title.js.map