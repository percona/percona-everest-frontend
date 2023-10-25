import {
  IconButton,
  Link,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import React from 'react';
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
      {open ? (
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
      ) : (
        <Tooltip
          sx={{
            '& .MuiTooltip-popper': {
              backgroundColor: 'yellow',
              color: 'rgba(255, 0, 0, 0.87)',
              // boxShadow: theme.shadows[1],
              fontSize: 11,
            },
            [`& .${tooltipClasses.arrow}`]: {
              color: 'red',
            },
          }}
          title={
            <Link
              sx={{ cursor: 'pointer' }}
              href="https://mui.com/material-ui/react-link/"
            >
              text
            </Link>
          }
          placement="right"
          arrow
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            <IconButton
              LinkComponent={NavLink}
              href={to}
              onClick={onClick}
              sx={{ p: '15px' }}
            >
              {React.createElement(icon)}
            </IconButton>
          </ListItemIcon>
        </Tooltip>
      )}
    </ListItem>
  );
};
