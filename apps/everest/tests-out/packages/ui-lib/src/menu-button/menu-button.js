import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Menu } from '@mui/material';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
const MenuButton = ({ children, buttonText, buttonProps, menuProps, }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = !!anchorEl;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Button, { id: "menu-button", "data-testid": "menu-button", "aria-controls": open ? 'menu-button-dropdown' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined, onClick: handleClick, endIcon: _jsx(ArrowDropDownOutlinedIcon, {}), size: "small", variant: "contained", ...buttonProps, children: buttonText }), _jsx(Menu, { id: "menu-button-dropdown", anchorEl: anchorEl, open: open, onClose: handleClose, MenuListProps: {
                    'aria-labelledby': 'menu-button',
                    ...menuProps?.MenuListProps,
                }, ...menuProps, children: children && children(handleClose) })] }));
};
export default MenuButton;
//# sourceMappingURL=menu-button.js.map