export interface DrawerContextProps {
  open: boolean;
  toggleOpen: () => any;
  activeBreakpoint: 'desktop' | 'tablet' | 'mobile';
}

export type EverestRoute = {
  to: string;
  text: string;
  icon: React.ElementType;
}