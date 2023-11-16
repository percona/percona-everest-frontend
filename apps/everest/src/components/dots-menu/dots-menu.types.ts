import { SvgIconComponent } from '@mui/icons-material';
import { MenuProps, MenuItemProps } from '@mui/material';

export interface Option extends MenuItemProps {
  onClick: () => void;
  icon?: SvgIconComponent;
}
export interface DotsMenuProps {
  menuProps?: MenuProps;
  options: Array<Option>;
  handleClose?: () => void;
}
