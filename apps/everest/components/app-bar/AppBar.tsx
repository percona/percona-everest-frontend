import React, { useContext, useState } from 'react';
import { Box, Divider, IconButton, Menu, MenuItem, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { EverestHorizontalIcon } from '@percona/ui-lib.icons.everest';
import { Link } from 'react-router-dom';
import { DrawerContext } from '../../contexts/drawer/drawer.context';
import { useAuth } from 'react-oidc-context';

export const AppBar = () => {
  const { activeBreakpoint, toggleOpen } = useContext(DrawerContext);
  const { user, signoutRedirect } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <MuiAppBar
        position="fixed"
        sx={(theme) => ({
          ...(activeBreakpoint !== 'mobile' && {
            zIndex: theme.zIndex.drawer + 1,
          }),
        })}
      >
        <Toolbar>
          {activeBreakpoint === 'mobile' && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleOpen}
              edge="start"
              sx={{ mr: 2 }}
            >
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
          )}
          <Link to="/">
            <EverestHorizontalIcon sx={{ height: '32px', width: 'auto' }} />
          </Link>
          <div
            style={{
              marginLeft: 'auto',
            }}
          >
            <IconButton
              size='small'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
              onClick={handleMenu}
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={!!anchorEl}
              onClose={handleClose}
            >
              <MenuItem>
                <Typography variant='helperText' color='text.secondary'>
                  {user?.profile.email}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => signoutRedirect()}>
                <Typography variant='button' fontSize='14px'>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};
