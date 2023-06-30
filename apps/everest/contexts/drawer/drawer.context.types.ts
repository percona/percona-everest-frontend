import { SetStateAction , Dispatch } from "react";


export interface DrawerContextProps {
  open: boolean;
  toggleOpen: () => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activeBreakpoint: 'desktop' | 'tablet' | 'mobile';
}
