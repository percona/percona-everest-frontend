import { ReactNode } from "react";
import { ButtonProps, MenuProps } from "@mui/material";

export type MenuButtonProps = {
  children?: ReactNode;
  buttonText: string;
  buttonProps?: ButtonProps;
  menuProps?: MenuProps;
}
