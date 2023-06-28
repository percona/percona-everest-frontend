export interface DrawerContextProps {
  open: boolean;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
  activeBreakpoint: 'desktop' | 'tablet' | 'mobile';
}

export type EverestRoute = {
  to: string;
  text: string;
  icon: React.ElementType;
}