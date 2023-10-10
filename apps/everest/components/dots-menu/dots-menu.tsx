import React from 'react';
import {
  IconButton,
  Menu,
  MenuProps,
  MenuItem,
  MenuItemProps,
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

export interface Option extends MenuItemProps {
  onClick: () => void;
}
interface DotsMenuProps {
  menuProps?: MenuProps;
  options: Array<Option>;
  handleClose?: () => void;
}

export const DotsMenu = ({ menuProps, options }: DotsMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="more-button"
        onClick={handleClick}
        size="small"
      >
        <MoreHorizOutlinedIcon />
      </IconButton>
      <Menu
        id="more-horiz-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        {...menuProps}
      >
        {options.map((item) => (
          <MenuItem
            key={item.key}
            onClick={() => {
              item?.onClick();
              handleClose();
            }}
          >
            {item.children}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
