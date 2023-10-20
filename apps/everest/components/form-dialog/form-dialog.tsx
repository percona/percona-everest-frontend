import React, { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
  ModalProps,
  Typography,
} from '@mui/material';
import { DialogTitle } from '@percona/ui-lib.dialog-title';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useActiveBreakpoint } from '../../hooks/utils/useActiveBreakpoint';
import { FormDialogProps } from './form-dialog.types';

export const FormDialog = <T extends FieldValues>({
  isOpen,
  closeModal,
  headerMessage,
  children,
  schema,
  defaultValues,
  values,
  onSubmit,
  cancelMessage = 'Cancel',
  submitMessage,
  validationMode = 'onChange',
  subHead2,
  size = 'L',
  submitting = false,
}: FormDialogProps<T>) => {
  const methods = useForm<T>({
    mode: validationMode,
    resolver: zodResolver(schema),
    defaultValues,
    values,
  });
  const {
    formState: { isDirty },
  } = methods;
  const { isMobile } = useActiveBreakpoint();
  const modalWidth = useMemo(() => {
    if (isMobile) {
      return '90%';
    }

    switch (size) {
      case 'L':
        return '480px';
      case 'XL':
        return '640px';
      case 'XXL':
        return '700px';
      default:
        return '640px';
    }
  }, [size, isMobile]);

  const handleSubmit: SubmitHandler<T> = (data) => {
    onSubmit(data);
  };

  const handleClose: ModalProps['onClose'] = (e, reason) => {
    if (reason === 'backdropClick') {
      if (!isDirty) {
        closeModal();
      }
    } else {
      closeModal();
    }
  };

  return (
    <Dialog
      PaperProps={{ sx: { minWidth: modalWidth } }}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle onClose={closeModal}>{headerMessage}</DialogTitle>
      <DialogContent>
        {/* @ts-ignore */}
        {subHead2 && <Typography variant="subHead2">{subHead2}</Typography>}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <FormGroup>{children}</FormGroup>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button disabled={submitting} onClick={closeModal}>
          {cancelMessage}
        </Button>
        <Button
          variant="contained"
          onClick={methods.handleSubmit(handleSubmit)}
          disabled={submitting}
        >
          {submitMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
