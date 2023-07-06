import { TextFieldProps } from "@mui/material";
import { LabeledContentProps } from "@percona/ui.labeled-content";
import { FieldValues, Control } from "react-hook-form";

export type TextInputProps<T extends FieldValues = FieldValues> = {
  control?: Control<T>;
  name: string;
  label?: string;
  labelProps?: LabeledContentProps;
  textFieldProps?: TextFieldProps;
};