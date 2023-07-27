import { Control, UseControllerProps } from "react-hook-form";
import { LabeledContentProps } from "@percona/ui-lib.labeled-content";
import { AutocompleteProps, TextFieldProps } from "@mui/material";

export type AutoCompleteInputProps<T> = {
  name: string;
  options: T[];
  control?: Control<any>;
  controllerProps?: UseControllerProps;
  label?: string;
  labelProps?: LabeledContentProps;
  autoCompleteProps?: Omit<AutocompleteProps<T, boolean | undefined, boolean | undefined, boolean | undefined>, 'options' | 'renderInput'>;
  textFieldProps?: TextFieldProps;
  loading?: boolean;
}
