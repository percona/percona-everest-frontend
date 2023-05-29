import React from 'react';
import {
  Typography as MuiTypography,
  Paper,
  Button as MuiButton,
  ButtonGroup as MuiButtonGroup,
  IconButton as MuiIconButton,
  Box,
  styled,
} from '@mui/material';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { PaletteThemeViewer } from '@percona/design.utils.palette-theme-viewer';
import { baseThemeOptions } from './BaseTheme';
import { Cached } from '@mui/icons-material';

const PaperItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

export const Typography = () => (
  <CompositionViewer themeOptions={baseThemeOptions}>
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

export const Palette = () => (
  <PaletteThemeViewer themeOptions={baseThemeOptions} />
);

export const Elevations = () => (
  <CompositionViewer themeOptions={baseThemeOptions}>
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

const buttonsLine = {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
};

export const Buttons = () => (
  <CompositionViewer themeOptions={baseThemeOptions}>
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.default',
        display: 'grid',
        gap: 1,
      }}
    >
      <Box
        sx={buttonsLine}
      >
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
      </Box>
      <Box
        sx={buttonsLine}
      >
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
      </Box>
      <Box
        sx={buttonsLine}
      >
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
      </Box>
      <Box
        sx={buttonsLine}
      >
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
      </Box>
      <Box
        sx={buttonsLine}
      >
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
      </Box>
      <Box
        sx={buttonsLine}
      >
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
      </Box>
    </Box>
  </CompositionViewer>
);
