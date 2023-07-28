import { SelectProps } from "@mui/material";
import { LabeledContentProps } from "@percona/ui-lib.labeled-content";
import { Control, UseControllerProps } from "react-hook-form";

export type SelectInputProps = {
  control?: Control<any>;
  controllerProps?: UseControllerProps;
  name: string;
  label?: string;
  labelProps?: LabeledContentProps;
  selectFieldProps?: SelectProps;
  children?: React.ReactNode;
  isRequired?: boolean;
};
