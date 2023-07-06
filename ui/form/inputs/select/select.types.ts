import { SelectProps, TextFieldProps } from "@mui/material";
import { LabeledContentProps } from "@percona/ui-lib.labeled-content";
import { Control, FieldValues } from "react-hook-form";

export type SelectInputProps<T extends FieldValues = FieldValues> = {
  control?: Control<T>;
  name: string;
  label?: string;
  labelProps?: LabeledContentProps;
  selectFieldProps?: SelectProps;
  children?: React.ReactNode;
};
