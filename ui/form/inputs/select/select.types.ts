import { SelectProps } from "@mui/material";
import { LabeledContentProps } from "@percona/ui-lib.labeled-content";
import { Control } from "react-hook-form";

export type SelectInputProps = {
  control?: Control<any>;
  name: string;
  label?: string;
  labelProps?: LabeledContentProps;
  selectFieldProps?: SelectProps;
  children?: React.ReactNode;
};
