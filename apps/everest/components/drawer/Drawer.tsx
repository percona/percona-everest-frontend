import React, { useContext } from 'react';
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer as MuiDrawer, Toolbar, styled } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { DRAWER_WIDTH } from './Drawer.constants';
import { closedMixin, openedMixin } from './Drawer.utils';
import { DrawerContext } from './Drawer.context';

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

const DrawerContent = ({ open }: { open: boolean }) => {
  const { toggleOpen } = useContext(DrawerContext);

  return (
    <>
      <DrawerHeader>
        <IconButton aria-label="open drawer" edge='start' onClick={toggleOpen}>
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
    </>
  );
};

const TabletDrawer = () => {
  const { open } = useContext(DrawerContext);

  return (
    <>
      <StyledDrawer variant='permanent' open={false}>
        <Toolbar />
        <DrawerContent open={false} />
      </StyledDrawer>
      <MuiDrawer anchor='left' variant='temporary' open={open}>
        <Toolbar />
        <DrawerContent open={open} />
      </MuiDrawer>
    </>
  );
}

const DesktopDrawer = () => {
  const { open } = useContext(DrawerContext);

  return (
    <StyledDrawer variant='permanent' open={open}>
      <Toolbar />
      <DrawerContent open={open} />
    </StyledDrawer>
  );
}

const MobileDrawer = () => {
  const { open } = useContext(DrawerContext);

  return (
    <MuiDrawer anchor='left' variant='temporary' open={open}>
      <DrawerContent open={open} />
    </MuiDrawer>
  );
}


export const Drawer = () => {
  const { activeBreakpoint } = useContext(DrawerContext);

  if (activeBreakpoint === 'mobile') {
    return (
      <MobileDrawer />
    );
  }

  if (activeBreakpoint === 'desktop') {
    return (
      <DesktopDrawer />
    );
  }

  return (
    <TabletDrawer />
  );
};
