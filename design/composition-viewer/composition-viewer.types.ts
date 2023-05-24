import { IconButtonProps } from '@mui/material';
import { ThemeContextProviderProps } from '@percona/design.theme-context-provider';

export type ColorTogglerProps = {} & IconButtonProps;
export type CompositionViewerProps = {
  children: React.ReactNode;
} & ThemeContextProviderProps;
