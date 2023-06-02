import React from 'react';
import { Box, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { EverestHorizontalIcon } from '@percona/ui-lib.icons.everest';

export const AppBar = () => {
  return (
    <Box>
      <MuiAppBar position='fixed' sx={(theme) => ({
        zIndex: theme.zIndex.drawer + 1,
      })}>
        <Toolbar>
          <EverestHorizontalIcon sx={{ height: '32px', width: 'auto' }} />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}