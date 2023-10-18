import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { DialogTitle } from '@percona/ui-lib.dialog-title';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useActiveBreakpoint } from '../../../../hooks/utils/useActiveBreakpoint';
import { Messages } from '../../db-cluster-details.messages';

interface NoStoragesModalProps {
  isOpen: boolean;
  closeModal: () => void;
  subHead: string;
  size: 'L' | 'XL' | 'XXL';
}

export const NoStoragesModal = ({
  isOpen,
  closeModal,
  subHead,
  size,
}: NoStoragesModalProps) => {
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

  return (
    <Dialog
      PaperProps={{ sx: { minWidth: modalWidth } }}
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
