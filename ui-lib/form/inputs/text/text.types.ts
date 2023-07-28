import { TextFieldProps } from '@mui/material';
import { LabeledContentProps } from '@percona/ui-lib.labeled-content';
import { Control, UseControllerProps } from 'react-hook-form';

export type TextInputProps = {
  control?: Control<any>;
  controllerProps?: UseControllerProps;
  name: string;
  label?: string;
  labelProps?: LabeledContentProps;
  textFieldProps?: TextFieldProps;
  isRequired?: boolean;
};
