import {
  ThemeProvider,
  Typography as MuiTypography,
  Button as MuiButton,
  ButtonGroup as MuiButtonGroup,
  IconButton as MuiIconButton,
} from '@mui/material';
import { Cached } from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';

import { getTheme } from './EverestTheme';
import React from 'react';

export const Typography = () => (
  <ThemeProvider theme={getTheme()}>
    <CssBaseline />
    <div>
      <MuiTypography variant="h1">H1 Heading</MuiTypography>
      <MuiTypography variant="h2">H2 Heading</MuiTypography>
      <MuiTypography variant="h3">H3 Heading</MuiTypography>
      <MuiTypography variant="h4">H4 Heading</MuiTypography>
      <MuiTypography variant="h5">H5 Heading</MuiTypography>
      <MuiTypography variant="h6">H6 Heading</MuiTypography>
    </div>
  </ThemeProvider>
);

export const Buttons = () => (
  <ThemeProvider theme={getTheme()}>
    <CssBaseline />
    <div>
      <MuiButton variant="contained" size="large">
        Large
      </MuiButton>
      <MuiButton variant="contained" size="large" disabled={true}>
        Large
      </MuiButton>
      <MuiButton variant="contained" size="medium">
        Medium
      </MuiButton>
      <MuiButton variant="contained" size="medium" disabled={true}>
        Medium
      </MuiButton>
      <MuiButton variant="contained" size="small">
        Small
      </MuiButton>
      <MuiButton variant="contained" size="small" disabled={true}>
        Small
      </MuiButton>
    </div>
    <div>
      <MuiButton variant="outlined" size="large">
        Large
      </MuiButton>
      <MuiButton variant="outlined" size="large" disabled={true}>
        Large
      </MuiButton>
      <MuiButton variant="outlined" size="medium">
        Medium
      </MuiButton>
      <MuiButton variant="outlined" size="medium" disabled={true}>
        Medium
      </MuiButton>
      <MuiButton variant="outlined" size="small">
        Small
      </MuiButton>
      <MuiButton variant="outlined" size="small" disabled={true}>
        Small
      </MuiButton>
    </div>
    <div>
      <MuiButton variant="text" size="large">
        Large
      </MuiButton>
      <MuiButton variant="text" size="large" disabled={true}>
        Large
      </MuiButton>
      <MuiButton variant="text" size="medium">
        Medium
      </MuiButton>
      <MuiButton variant="text" size="medium" disabled={true}>
        Medium
      </MuiButton>
      <MuiButton variant="text" size="small">
        Small
      </MuiButton>
      <MuiButton variant="text" size="small" disabled={true}>
        Small
      </MuiButton>
    </div>
    <div>
      <div>
        <MuiButtonGroup variant="contained" size="medium">
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
        </MuiButtonGroup>
        <MuiButtonGroup variant="contained" size="medium">
          <MuiButton>Medium</MuiButton>
          <MuiButton>
            <Cached />
          </MuiButton>
        </MuiButtonGroup>
      </div>
      <div>
        <MuiButtonGroup variant="outlined" size="medium">
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
        </MuiButtonGroup>
        <MuiButtonGroup variant="outlined" size="medium">
          <MuiButton>Medium</MuiButton>
          <MuiButton>
            <Cached />
          </MuiButton>
        </MuiButtonGroup>
      </div>
      {/*<div>*/}
      {/*  <MuiButtonGroup variant="contained" size="large">*/}
      {/*    <MuiButton>Large</MuiButton>*/}
      {/*    <MuiButton>Large</MuiButton>*/}
      {/*    <MuiButton>Large</MuiButton>*/}
      {/*  </MuiButtonGroup>*/}
      {/*  <MuiButtonGroup variant="contained" size="large">*/}
      {/*    <MuiButton>Large</MuiButton>*/}
      {/*    <MuiButton>*/}
      {/*      <Cached />*/}
      {/*    </MuiButton>*/}
      {/*  </MuiButtonGroup>*/}
      {/*</div>*/}
      {/*<div>*/}
      {/*  <MuiButtonGroup variant="contained" size="small">*/}
      {/*    <MuiButton>Small</MuiButton>*/}
      {/*    <MuiButton>Small</MuiButton>*/}
      {/*    <MuiButton>Small</MuiButton>*/}
      {/*  </MuiButtonGroup>*/}
      {/*  <MuiButtonGroup variant="contained" size="small">*/}
      {/*    <MuiButton>Small</MuiButton>*/}
      {/*    <MuiButton>*/}
      {/*      <Cached />*/}
      {/*    </MuiButton>*/}
      {/*  </MuiButtonGroup>*/}
      {/*</div>*/}
    </div>
    <div>
      <MuiIconButton size="large">
        <Cached />
      </MuiIconButton>
      <MuiIconButton size="large" disabled={true}>
        <Cached />
      </MuiIconButton>
      <MuiIconButton size="medium">
        <Cached />
      </MuiIconButton>
      <MuiIconButton size="medium" disabled={true}>
        <Cached />
      </MuiIconButton>
      <MuiIconButton size="small">
        <Cached />
      </MuiIconButton>
      <MuiIconButton size="small" disabled={true}>
        <Cached />
      </MuiIconButton>
    </div>
    <MuiIconButton size="large" color="primary">
      <Cached />
    </MuiIconButton>
    <MuiIconButton size="large" disabled={true}>
      <Cached />
    </MuiIconButton>
    <MuiIconButton size="medium" color="primary">
      <Cached />
    </MuiIconButton>
    <MuiIconButton size="medium" disabled={true}>
      <Cached />
    </MuiIconButton>
    <MuiIconButton size="small" color="primary">
      <Cached />
    </MuiIconButton>
    <MuiIconButton size="small" disabled={true}>
      <Cached />
    </MuiIconButton>
    <div></div>
  </ThemeProvider>
);
