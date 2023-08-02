import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
} from '@mui/material';

import React, { ReactNode } from 'react';
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';
import { DialogTitle } from './dialog-title';

interface GeneralCreateEditModalProps<T extends FieldValues> {
  isOpen: boolean;
  closeModal: () => void;
  headerMessage: string;
  handleSubmit: UseFormHandleSubmit<T, undefined>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  cancelMessage?: string;
  submitMessage: string;
}

export const GeneralCreateEditModal = <T extends FieldValues>({
  isOpen,
  closeModal,
  headerMessage,
  children,
  handleSubmit,
  onSubmit,
  cancelMessage = 'Cancel',
  submitMessage,
}: GeneralCreateEditModalProps<T>) => {
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle id={'dialog-title'} onClose={closeModal}>
        {headerMessage}
      </DialogTitle>
      <DialogContent sx={{ width: '480px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>{children}</FormGroup>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>{cancelMessage}</Button>
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {submitMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
