import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
} from '@mui/material';
import { DialogTitle } from '@percona/ui-lib.dialog-title';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { FormDialogProps } from './form-dialog.types';

export const FormDialog = <T extends FieldValues>({
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
}: FormDialogProps<T>) => {
  const methods = useForm<T>({
    mode: validationMode,
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    closeModal();
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle onClose={closeModal}>{headerMessage}</DialogTitle>
      <DialogContent sx={{ width: '480px' }}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <FormGroup>{children}</FormGroup>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>{cancelMessage}</Button>
        <Button
          variant="contained"
          onClick={methods.handleSubmit(handleSubmit)}
        >
          {submitMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
