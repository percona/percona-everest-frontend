export interface DrawerContextProps {
  open: boolean;
  toggleOpen: () => any;
  activeBreakpoint: 'desktop' | 'tablet' | 'mobile';
}
