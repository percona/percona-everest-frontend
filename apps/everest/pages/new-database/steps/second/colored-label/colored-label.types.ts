import { SxProps, Theme } from '@mui/material';
export interface ColoredLabelProps {
  sxBox?: SxProps<Theme>;
  sxTypography?: SxProps<Theme>;
  label: string;
  bordered?: boolean;
}
