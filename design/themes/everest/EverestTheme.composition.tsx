import React from 'react';
import { PaletteThemeViewer } from '@percona/design.utils.palette-theme-viewer';
import { everestThemeOptions } from './EverestTheme';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { baseThemeOptions } from '@percona/design.themes.base';
import {
  Button as MuiButton,
  ButtonGroup as MuiButtonGroup,
  IconButton as MuiIconButton,
  Box,
} from '@mui/material';
import { Cached } from '@mui/icons-material';

export const Palette = () => (
  <PaletteThemeViewer themeOptions={everestThemeOptions} />
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
      </Box>
    </Box>
  </CompositionViewer>
);
