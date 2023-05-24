import React from 'react';
import { PaletteThemeViewer } from '@percona/design.utils.palette-theme-viewer';
import { getTheme } from './EverestTheme';

export const Palette = () => <PaletteThemeViewer getTheme={getTheme} />;
