import { FormControlLabelProps } from "@mui/material";
import { Control, UseControllerProps } from "react-hook-form";

export type SwitchInputProps = {
  control?: Control<any>;
  controllerProps?: UseControllerProps;
  formControlLabelProps?: FormControlLabelProps;
  name: string;
  label: string;
};