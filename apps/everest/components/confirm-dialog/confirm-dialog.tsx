import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { DialogTitle } from '@percona/ui-lib.dialog-title';
import React from 'react';
import { ConfirmDialogProps } from './confirm-dialog.types';

export const ConfirmDialog = ({
  isOpen,
  closeModal,
  selectedId,
  children: content,
  handleConfirm,
  headerMessage,
  cancelMessage = 'Cancel',
  submitMessage = 'Delete',
}: ConfirmDialogProps) => {
  const handleClose = () => {
    handleConfirm(selectedId);
    closeModal();
  };
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle onClose={closeModal}>{headerMessage}</DialogTitle>
      <DialogContent sx={{ width: '480px' }}>{content}</DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>{cancelMessage}</Button>
        <Button variant="contained" onClick={handleClose}>
          {submitMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
