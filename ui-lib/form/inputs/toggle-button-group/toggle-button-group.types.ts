import { ToggleButtonGroupProps } from "@mui/material";
import { LabeledContentProps } from "@percona/ui-lib.labeled-content";
import { Control, UseControllerProps } from "react-hook-form";

export type ToggleButtonGroupInputProps = {
  control?: Control<any>;
  name: string;
  label?: string;
  labelProps?: LabeledContentProps;
  controllerProps?: UseControllerProps;
  toggleButtonGroupProps?: ToggleButtonGroupProps;
  children: React.ReactNode;
};