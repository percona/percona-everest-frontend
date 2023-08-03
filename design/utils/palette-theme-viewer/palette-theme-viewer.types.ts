import { PaletteMode, ThemeOptions } from '@mui/material';

export type PaletteThemeViewerProps = {
  themeOptions: (mode: PaletteMode) => ThemeOptions;
};
