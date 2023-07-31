import React from 'react';
import { IconButton, DialogTitle as MuiDialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { DialogTitleProps } from './dialog-title.types';

export const DialogTitle = ({ onClose, children, ...props }: DialogTitleProps) => (
  <MuiDialogTitle {...props}>
    {children}
    {onClose ? (
      <IconButton
        aria-label="close"
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
