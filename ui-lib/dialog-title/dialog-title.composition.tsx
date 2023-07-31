import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { DialogTitle } from './dialog-title';

export const BasicDialogTitle = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog open={open}>
        <DialogTitle onClick={() => setOpen(false)}>Modal Title</DialogTitle>
      </Dialog>
      <DialogContent dividers>
        <Typography>
          Lorem ipsum
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained">
          Accept
        </Button>
      </DialogActions>
    </>
  );
}
