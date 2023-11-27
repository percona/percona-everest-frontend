import { MenuProps, MenuItemProps, IconButtonProps } from '@mui/material';

export interface Option extends MenuItemProps {
  onClick: () => void;
}
export interface DotsMenuProps {
  menuProps?: MenuProps;
  options: Array<Option>;
  handleClose?: () => void;
  iconButtonProps?: IconButtonProps;
}
