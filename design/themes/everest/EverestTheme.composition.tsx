import { Typography as MuiTypography } from '@mui/material';
import React from 'react';
import { EverestCompositionViewer } from './EverestCompositionViewer';

export const Typography = () => (
  <EverestCompositionViewer>
    <MuiTypography variant="h1">H1 Heading</MuiTypography>
    <MuiTypography variant="h2">H2 Heading</MuiTypography>
    <MuiTypography variant="h3">H3 Heading</MuiTypography>
    <MuiTypography variant="h4">H4 Heading</MuiTypography>
    <MuiTypography variant="h5">H5 Heading</MuiTypography>
    <MuiTypography variant="h6">H6 Heading</MuiTypography>
  </EverestCompositionViewer>
);
