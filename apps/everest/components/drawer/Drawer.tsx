import React, { useContext } from 'react';
import {
  IconButton,
  List,
  Drawer as MuiDrawer,
  Toolbar,
  styled,
} from '@mui/material';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { DRAWER_WIDTH, ROUTES } from './Drawer.constants';
import { closedMixin, openedMixin } from './Drawer.utils';
import { NavItem } from '../nav-item/NavItem';
import { DrawerContext } from '../../contexts/drawer/drawer.context';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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
}));

const DrawerContent = ({ open }: { open: boolean }) => {
  const { toggleOpen, setOpen, activeBreakpoint } = useContext(DrawerContext);

  return (
    <>
      <DrawerHeader data-testid={`${activeBreakpoint}-drawer-header`}>
        <IconButton
          aria-label="open drawer"
          data-testid="open-drawer-button"
          edge="start"
          onClick={toggleOpen}
        >
          {open ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <List>
        {ROUTES.map(({ to, icon, text }) => (
          <NavItem
            onClick={() => setOpen(false)}
            to={to}
            open={open}
            icon={icon}
            text={text}
            key={to}
          />
        ))}´
      </List>
    </>
  );
};

const TabletDrawer = () => {
  const { open } = useContext(DrawerContext);

  return (
    <>
      <StyledDrawer variant="permanent" open={false}>
        <Toolbar />
        <DrawerContent open={false} />
      </StyledDrawer>
      <MuiDrawer
        anchor="left"
        variant="temporary"
        open={open}
        sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
      >
        <Toolbar />
        <DrawerContent open={open} />
      </MuiDrawer>
    </>
  );
};

const DesktopDrawer = () => {
  const { open } = useContext(DrawerContext);

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Toolbar />
      <DrawerContent open={open} />
    </StyledDrawer>
  );
};

const MobileDrawer = () => {
  const { open } = useContext(DrawerContext);

  return (
    <MuiDrawer
      anchor="left"
      variant="temporary"
      open={open}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{ '& .MuiDrawer-paper': { width: DRAWER_WIDTH } }}
    >
      <DrawerContent open={open} />
    </MuiDrawer>
  );
};

export const Drawer = () => {
  const { activeBreakpoint } = useContext(DrawerContext);

  if (activeBreakpoint === 'mobile') {
    return <MobileDrawer />;
  }

  if (activeBreakpoint === 'desktop') {
    return <DesktopDrawer />;
  }

  return <TabletDrawer />;
};
