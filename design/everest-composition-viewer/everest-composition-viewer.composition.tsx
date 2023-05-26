import React from 'react';
import { PaletteThemeViewer } from '@percona/design.utils.palette-theme-viewer';
import { getTheme } from '@percona/design.themes.everest';

export const Palette = () => <PaletteThemeViewer getTheme={getTheme} />;
