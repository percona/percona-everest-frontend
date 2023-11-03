import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { DialogTitle } from '@percona/ui-lib';
import { Link } from 'react-router-dom';
import { useActiveBreakpoint } from '@/hooks/utils/useActiveBreakpoint';
import { Messages } from '../../db-cluster-details.messages';
import { NoStoragesModalProps } from './no-storages-modal.type';

export const NoStoragesModal = ({
  isOpen,
  closeModal,
  subHead,
}: NoStoragesModalProps) => {
  const { isMobile } = useActiveBreakpoint();

  return (
    <Dialog
      PaperProps={{ sx: { minWidth: isMobile ? '90%' : '640px' } }}
      open={isOpen}
      onClose={closeModal}
    >
      <DialogTitle onClose={closeModal}>
        {Messages.onDemandBackupModal.headerMessage}
      </DialogTitle>
      <DialogContent>
        <Typography variant="subHead2">{subHead}</Typography>
        <Alert sx={{ mt: 3 }} severity="info">
          {Messages.noStorages.alert}
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>{Messages.noStorages.cancel}</Button>
        <Button
          component={Link}
          to="/settings/storage-locations"
          variant="contained"
        >
          {Messages.noStorages.submitButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
