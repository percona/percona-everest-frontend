import { ToggleButtonGroupProps } from "@mui/material";
import { LabeledContentProps } from "@percona/ui.labeled-content";
import { Control } from "react-hook-form";

export type ToggleButtonGroupInputProps = {
  control?: Control<any>;
  name: string;
  label?: string;
  labelProps?: LabeledContentProps;
  toggleButtonGroupProps?: ToggleButtonGroupProps;
  children: React.ReactNode;
};