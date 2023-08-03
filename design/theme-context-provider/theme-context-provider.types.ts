import { PaletteMode, ThemeOptions } from '@mui/material';

export type ThemeContextProviderProps = {
  children: React.ReactNode;
  themeOptions: (mode: PaletteMode) => ThemeOptions;
};
