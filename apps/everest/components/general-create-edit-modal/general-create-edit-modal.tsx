import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { DialogTitle } from './dialog-title/dialog-title';
import { GeneralCreateEditModalProps } from './general-create-edit-modal.types';

export const GeneralCreateEditModal = <T extends FieldValues>({
  isOpen,
  closeModal,
  headerMessage,
  children,
  schema,
  defaultValues,
  onSubmit,
  cancelMessage = 'Cancel',
  submitMessage,
  validationMode = 'onChange',
}: GeneralCreateEditModalProps<T>) => {
  const methods = useForm<T>({
    mode: validationMode,
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle id="dialog-title" onClose={closeModal}>
        {headerMessage}
      </DialogTitle>
      <DialogContent sx={{ width: '480px' }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <FormGroup>{children}</FormGroup>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>{cancelMessage}</Button>
        <Button variant="contained" onClick={methods.handleSubmit(onSubmit)}>
          {submitMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
