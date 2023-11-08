import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { DialogTitle } from '@percona/ui-lib';
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
  disabledButtons = false,
}: ConfirmDialogProps) => {
  const onClick = () => {
    handleConfirm(selectedId);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      data-testid={`${selectedId}-confirm-dialog`}
    >
      <DialogTitle onClose={closeModal}>{headerMessage}</DialogTitle>
      <DialogContent sx={{ width: '480px' }}>{content}</DialogContent>
      <DialogActions>
        <Button onClick={closeModal} disabled={disabledButtons}>
          {cancelMessage}
        </Button>
        <Button
          variant="contained"
          onClick={onClick}
          disabled={disabledButtons}
        >
          {submitMessage}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
