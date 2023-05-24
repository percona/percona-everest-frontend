import React from 'react';
import { PaletteThemeViewer } from './palette-theme-viewer';
import { getTheme } from '@percona/design.themes.base';

export const BasicPaletteThemeViewer = () => {
  return <PaletteThemeViewer getTheme={getTheme} />;
};
