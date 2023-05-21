import { ThemeProvider, Typography as MuiTypography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { BaseTheme } from './BaseTheme';
import React from 'react';

export const Typography = () => (
  <ThemeProvider theme={BaseTheme}>
    <CssBaseline />
    <div>
      <MuiTypography variant='h1'>H1 Heading</MuiTypography>
      <MuiTypography variant='h2'>H2 Heading</MuiTypography>
      <MuiTypography variant='h3'>H3 Heading</MuiTypography>
      <MuiTypography variant='h4'>H4 Heading</MuiTypography>
      <MuiTypography variant='h5'>H5 Heading</MuiTypography>
      <MuiTypography variant='h6'>H6 Heading</MuiTypography>
    </div>
  </ThemeProvider>
);
