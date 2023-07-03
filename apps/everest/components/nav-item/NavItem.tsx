import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { NavItemProps } from './NavItem.types';

export const NavItem = ({
  open,
  icon,
  text,
  to,
  onClick,
  ...listItemProps
}: NavItemProps) => {
  return (
    <ListItem disablePadding sx={{ display: 'block' }} {...listItemProps}>
      <ListItemButton
        component={NavLink}
        to={to}
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {React.createElement(icon)}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};
