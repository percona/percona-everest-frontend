import React from 'react';
import { Typography as MuiTypography } from '@mui/material';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { PaletteThemeViewer } from '@percona/design.utils.palette-theme-viewer';
import { getTheme } from './BaseTheme';

export const Typography = () => (
  <CompositionViewer>
    <MuiTypography variant="h1">H1 Heading</MuiTypography>
    <MuiTypography variant="h2">H2 Heading</MuiTypography>
    <MuiTypography variant="h3">H3 Heading</MuiTypography>
    <MuiTypography variant="h4">H4 Heading</MuiTypography>
    <MuiTypography variant="h5">H5 Heading</MuiTypography>
    <MuiTypography variant="h6">H6 Heading</MuiTypography>
    <MuiTypography variant="subtitle1">Subtitle 1</MuiTypography>
    <MuiTypography variant="subtitle2">Subtitle 2</MuiTypography>
    <MuiTypography variant="overline">Overline</MuiTypography>
    <MuiTypography variant="body1">Body 1</MuiTypography>
    <MuiTypography variant="body2">Body 2</MuiTypography>
    <MuiTypography variant="caption">Caption</MuiTypography>
  </CompositionViewer>
);

export const Palette = () => <PaletteThemeViewer getTheme={getTheme} />;
