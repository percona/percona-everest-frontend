import { Control, FieldValues } from "react-hook-form";

export type SwitchInputProps<T extends FieldValues = FieldValues> = {
  control?: Control<T>;
  name: string;
  label: string;
};