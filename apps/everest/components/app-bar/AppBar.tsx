import React from 'react';
import { Box, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { EverestHorizontalIcon } from '@percona/ui-lib.icons.everest';

export const AppBar = () => {
  return (
    <Box>
      <MuiAppBar position='static'>
        <Toolbar>
          <EverestHorizontalIcon sx={{ height: '32px', width: 'auto' }} />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}