import { FormControlLabelProps as MuiFormControlLabelProps, SxProps, Theme } from "@mui/material";
import { Control, UseControllerProps } from "react-hook-form";

type FormControlLabelProps = MuiFormControlLabelProps & {sx?: SxProps<Theme>};

export type SwitchInputProps = {
  control?: Control<any>;
  controllerProps?: UseControllerProps;
  formControlLabelProps?: FormControlLabelProps;
  name: string;
  label: React.ReactNode;
};
