import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { DialogTitle } from './DialogTitle';

export const CreateEditModalStorage = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id={'storage-dialog-title'} onClose={handleClose}>
        Add Storage Location
      </DialogTitle>
      <DialogContent sx={{ width: '480px' }}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleClose}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
