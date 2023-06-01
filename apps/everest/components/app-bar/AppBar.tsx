import React from 'react';
import { Box, IconButton, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { EverestHorizontalIcon } from '@percona/ui-lib.icons.everest';

export const AppBar = () => {
  return (
    <Box>
      <MuiAppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            aria-label="menu"
          >
            <EverestHorizontalIcon sx={{ height: '32px', width: 'auto' }} />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}