import { Control, UseControllerProps } from "react-hook-form";

export type SwitchInputProps = {
  control?: Control<any>;
  controllerProps?: UseControllerProps;
  name: string;
  label: string;
};