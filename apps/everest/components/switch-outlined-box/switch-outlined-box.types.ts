import { Control, UseControllerProps } from 'react-hook-form';
import { FormControlLabelProps, SxProps, Theme } from '@mui/material';

export type SwitchOutlinedBoxProps = {
  control?: Control<any>;
  controllerProps?: UseControllerProps;
  formControlLabelProps?: FormControlLabelProps;
  name: string;
  label?: string;
  labelHeader?: string;
  labelDescription?: string;
  children?: React.ReactNode;
  switchOutlinedBoxSx?: SxProps<Theme>;
  switchOutlinedBoxChildrenSx?: SxProps<Theme>;
};
