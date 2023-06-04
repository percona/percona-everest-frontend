import React, { useContext } from 'react';
import { Box, IconButton, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { EverestHorizontalIcon } from '@percona/ui-lib.icons.everest';
import { DrawerContext } from '../drawer/Drawer.context';
import { Link } from 'react-router-dom';

export const AppBar = () => {
  const { activeBreakpoint, toggleOpen } = useContext(DrawerContext);

  return (
    <Box>
      <MuiAppBar position='fixed' sx={(theme) => ({
        ...(activeBreakpoint !== 'mobile' && {
          zIndex: theme.zIndex.drawer + 1,
        })
      })}>
        <Toolbar>
          {activeBreakpoint === 'mobile' &&
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          }
          <Link to='/'>
            <EverestHorizontalIcon sx={{ height: '32px', width: 'auto' }} />
          </Link>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}