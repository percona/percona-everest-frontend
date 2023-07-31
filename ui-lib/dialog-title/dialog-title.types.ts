import { DialogTitleProps as MuiDialogTitleProps } from "@mui/material";

export type DialogTitleProps = {
  onClose?: () => void;
} & MuiDialogTitleProps;