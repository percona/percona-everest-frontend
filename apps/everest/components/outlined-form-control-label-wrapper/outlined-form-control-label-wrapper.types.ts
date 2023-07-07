import { SxProps, Theme } from '@mui/material';
import { FormControlLabelProps } from '../form-control-label/form-control-label.types';

export interface FormControlLabelWrapperProps extends FormControlLabelProps {
  children: React.ReactNode;
  boxSx?: SxProps<Theme>;
}
