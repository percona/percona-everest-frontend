import { useMemo } from 'react';
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
import { DialogTitle } from '@percona/ui-lib';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useActiveBreakpoint } from '../../hooks/utils/useActiveBreakpoint';
import { FormDialogProps } from './form-dialog.types';
import { kebabize } from '@percona/utils';

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
    formState: { isDirty, isValid },
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

  const handleClose: ModalProps['onClose'] = (_e, reason) => {
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
        {subHead2 && <Typography variant="subHead2">{subHead2}</Typography>}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <FormGroup>{children}</FormGroup>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={submitting}
          onClick={closeModal}
          data-testid={`form-dialog-${kebabize(cancelMessage)}`}
        >
          {cancelMessage}
        </Button>
        <Button
          variant="contained"
          onClick={methods.handleSubmit(handleSubmit)}
          disabled={submitting || !isValid}
          data-testid={`form-dialog-${kebabize(submitMessage)}`}
        >
          {submitMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
