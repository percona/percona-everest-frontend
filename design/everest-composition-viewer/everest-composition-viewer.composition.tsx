import React from 'react';
import { PaletteThemeViewer } from '@percona/design.utils.palette-theme-viewer';
import { everestThemeOptions } from '@percona/design.themes.everest';

export const Palette = () => <PaletteThemeViewer themeOptions={everestThemeOptions} />;
