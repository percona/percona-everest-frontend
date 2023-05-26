import React from 'react';
import { Grid, Typography as MuiTypography, Paper, Button as MuiButton,
  ButtonGroup as MuiButtonGroup } from '@mui/material';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { PaletteThemeViewer } from '@percona/design.utils.palette-theme-viewer';
import { getTheme } from './BaseTheme';
import { Box } from '@mui/material';
import { styled } from '@mui/material';

const PaperItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

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

export const Buttons = () => (
    <CompositionViewer>
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
        <MuiButtonGroup variant="contained">
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
        </MuiButtonGroup>
        <MuiButtonGroup variant="outlined">
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
        </MuiButtonGroup>
      </div>
      </CompositionViewer>
);

export const Elevations = () => (
  <CompositionViewer>
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.default',
        display: 'grid',
        gridTemplateColumns: { sm: '1fr 1fr' },
        gap: 2,
      }}
    >
      {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
        <PaperItem key={elevation} elevation={elevation}>
          {`elevation=${elevation}`}
        </PaperItem>
      ))}
    </Box>
  </CompositionViewer>
);
