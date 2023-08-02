import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { ReactNode } from 'react';
import {
  DeepPartial,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  ValidationMode,
} from 'react-hook-form';
import { ZodObject, ZodRawShape } from 'zod';
import { DialogTitle } from './dialog-title';

interface GeneralCreateEditModalProps<T extends FieldValues> {
  isOpen: boolean;
  closeModal: () => void;
  headerMessage: string;
  schema: ZodObject<ZodRawShape>;
  defaultValues?: DeepPartial<T>;
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  cancelMessage?: string;
  submitMessage: string;
  validationMode?: keyof ValidationMode;
}

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
    defaultValues: defaultValues,
  });

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle id={'dialog-title'} onClose={closeModal}>
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
