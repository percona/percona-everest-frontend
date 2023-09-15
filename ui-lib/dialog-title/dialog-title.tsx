import CloseIcon from '@mui/icons-material/Close';
import { DialogTitle as MuiDialogTitle, IconButton } from '@mui/material';
import React from 'react';

import { DialogTitleProps } from './dialog-title.types';

export const DialogTitle = ({
  onClose,
  children,
  ...props
}: DialogTitleProps) => (
  <MuiDialogTitle {...props}>
    {children}
    {onClose ? (
      <IconButton
        aria-label="close"
        data-testid="close-dialog-icon"
        onClick={onClose}
        sx={{
          position: 'absolute',
          p: 2,
          top: 0,
          right: 0,
        }}
      >
        <CloseIcon />
      </IconButton>
    ) : null}
  </MuiDialogTitle>
);
