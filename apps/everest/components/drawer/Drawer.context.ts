import { createContext } from 'react';
import { DrawerContextProps } from './Drawer.types';

export const DrawerContext = createContext<DrawerContextProps>({
  open: false,
  toggleOpen: () => {},
  setOpen: () => {},
  activeBreakpoint: 'desktop',
});
