import { ThemeProvider, Typography as MuiTypography, useTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { getTheme } from './BaseTheme';
import React from 'react';

export const Typography = () => (
  <ThemeProvider theme={getTheme()}>
    <CssBaseline />
    <div>
      <MuiTypography variant='h1'>H1 Heading</MuiTypography>
      <MuiTypography variant='h2'>H2 Heading</MuiTypography>
      <MuiTypography variant='h3'>H3 Heading</MuiTypography>
      <MuiTypography variant='h4'>H4 Heading</MuiTypography>
      <MuiTypography variant='h5'>H5 Heading</MuiTypography>
      <MuiTypography variant='h6'>H6 Heading</MuiTypography>
      <MuiTypography variant='subtitle1'>Subtitle 1</MuiTypography>
      <MuiTypography variant='subtitle2'>Subtitle 2</MuiTypography>
      <MuiTypography variant='overline'>Overline</MuiTypography>
      <MuiTypography variant='body1'>Body 1</MuiTypography>
      <MuiTypography variant='body2'>Body 2</MuiTypography>
      <MuiTypography variant='caption'>Caption</MuiTypography>
    </div>
  </ThemeProvider>
);

export const Palette = () => {
  const { palette } = useTheme();

  const tokens = Object.entries(palette).map(([name, value]: [string, string]) => ({
    name,
    value,
  }));
}
