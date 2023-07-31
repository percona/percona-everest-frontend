import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { baseThemeOptions } from '@percona/design.themes.base';
import { DialogTitle } from './dialog-title';

export const BasicDialogTitle = () => {
  const [open, setOpen] = useState(false);

  return (
    <CompositionViewer themeOptions={baseThemeOptions}>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Dialog open={open}>
        <DialogTitle onClose={() => setOpen(false)}>Modal Title</DialogTitle>
        <DialogContent>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="text" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </CompositionViewer>
  );
}
