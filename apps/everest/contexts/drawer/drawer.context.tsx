import React, { createContext } from "react";
import { DrawerContextProps } from "./drawer.context.types";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material";

export const DrawerContext = createContext<DrawerContextProps>({
  open: false,
  toggleOpen: () => { },
  setOpen: () => { },
  activeBreakpoint: 'desktop',
});

export const DrawerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleOpen = () => setDrawerOpen((val) => !val);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const activeBreakpoint = isMobile
    ? 'mobile'
    : isDesktop
      ? 'desktop'
      : 'tablet'; 

  return (
    <DrawerContext.Provider value={{ open: drawerOpen, toggleOpen, activeBreakpoint, setOpen: setDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}
