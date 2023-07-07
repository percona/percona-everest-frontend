import { FormControlLabelProps } from '../form-control-label/form-control-label.types';
import { SxProps, Theme } from '@mui/material';

export interface FormControlLabelWrapperProps extends FormControlLabelProps {
  children: React.ReactNode;
  boxSx?: SxProps<Theme>;
}
