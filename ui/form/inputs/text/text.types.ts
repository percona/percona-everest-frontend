import { TextFieldProps } from "@mui/material";
import { LabeledContentProps } from "@percona/ui.labeled-content";
import { Control } from "react-hook-form";

export type TextInputProps = {
  control?: Control<any>;
  name: string;
  label?: string;
  labelProps?: LabeledContentProps;
  textFieldProps?: TextFieldProps;
};