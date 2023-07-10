import { ListItemProps } from '@mui/material';

export type NavItemProps = {
  open: boolean;
  icon: React.ElementType;
  text: string;
  to: string;
  onClick: () => void;
} & ListItemProps;
