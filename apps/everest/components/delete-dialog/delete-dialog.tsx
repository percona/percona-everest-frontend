import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { DialogTitle } from '@percona/ui-lib.dialog-title';
import React, { ReactNode } from 'react';

interface DeleteDialogProps {
  isOpen: boolean;
  selectedId: string;
  closeModal: () => void;
  headerMessage: string;
  children: ReactNode;
  handleConfirm: (selectedId: string) => void;
  cancelMessage?: string;
  submitMessage?: string;
}

export const DeleteDialog = ({
  isOpen,
  closeModal,
  selectedId,
  children: content,
  handleConfirm,
  headerMessage,
  cancelMessage = 'Cancel',
  submitMessage = 'Delete',
}: DeleteDialogProps) => {
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
