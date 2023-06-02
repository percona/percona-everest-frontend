import React, { useState } from 'react';
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer as MuiDrawer, Toolbar, styled } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { DRAWER_WIDTH } from './Drawer.constants';
import { closedMixin, openedMixin } from './Drawer.utils';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export const Drawer = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen((val) => !val);
  };

  return (
    <StyledDrawer variant='permanent' open={open}>
      <Toolbar />
      <DrawerHeader>
        <IconButton aria-label="open drawer" edge='start' onClick={handleDrawerOpen}>
          {open ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
        </IconButton>
      </DrawerHeader>
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
          }}>
            <ListItemIcon sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}>
              <StorageIcon />
            </ListItemIcon>
            <ListItemText primary="Databases" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </StyledDrawer>
  );
};
