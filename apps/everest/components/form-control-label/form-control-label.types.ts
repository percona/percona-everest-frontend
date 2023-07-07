import {
  FormControlLabelProps as MuiFormControlLabelProps,
  SxProps,
  Theme,
} from '@mui/material';
export interface FormControlLabelProps
  extends Omit<MuiFormControlLabelProps, 'label'> {
  labelHeader?: string;
  labelMessage?: string;
  label?: React.ReactNode;
  outlined?: boolean;
  sxLabel?: SxProps<Theme>;
}
