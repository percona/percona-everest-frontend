import { SxProps, Theme } from '@mui/material';

export type CopyToClipboardButtonProps = {
  textToCopy: string;
  iconSx?: SxProps<Theme>;
  buttonSx?: SxProps<Theme>;
};
